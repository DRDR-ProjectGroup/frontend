# 글 작성 및 수정 기능 흐름

## 📝 전체 구조

```
app/posts/write/page.tsx          → 글 작성 페이지
app/posts/[postId]/edit/page.tsx  → 글 수정 페이지
components/posts/write/
  ├── PostWriteForm.tsx            → 공통 작성/수정 폼
  ├── SelectCategory.tsx           → 카테고리 선택
  ├── hooks/
  │   └── usePostImageManager.ts   → 이미지 업로드 관리
  └── utils/
      └── imageProcessor.ts        → 이미지 URL 변환
```

---

## ✍️ 글 작성 흐름

### 1. 사용자 작성
- 카테고리 선택
- 제목 입력
- 에디터에서 본문 작성 + 이미지 업로드

### 2. 이미지 업로드 처리
```javascript
// 사용자가 이미지 첨부
에디터에 이미지 삽입 → blob URL 생성 (blob:http://...)
→ Map에 { blobUrl: File } 저장
```

### 3. 제출 시 변환
```javascript
// replaceImagesWithPlaceholders()
<img src="blob:http://..."> → <img src="{{IMG_0}}">
<img src="blob:http://..."> → <img src="{{IMG_1}}">
```

### 4. 백엔드 전송
```javascript
FormData {
  post: { title, content: "... {{IMG_0}} ... {{IMG_1}} ..." }
  files: [File, File]
}
```

### 5. 백엔드 처리
- 파일을 서버에 저장
- placeholder를 실제 파일 경로로 치환
- DB에 저장

### 6. 조회 시
```javascript
// 백엔드 응답
{
  content: "... {{IMG_0}} ... {{IMG_1}} ...",
  mediaList: [
    { url: "/uploads/image1.jpg", order: 0 },
    { url: "/uploads/image2.jpg", order: 1 }
  ]
}

// 프론트엔드 변환 (replacePlaceholdersWithUrls)
{{IMG_0}} → http://localhost:8080/uploads/image1.jpg
{{IMG_1}} → http://localhost:8080/uploads/image2.jpg
```

---

## 🔧 글 수정 흐름

### 1. 수정 페이지 진입
- URL: `/posts/[postId]/edit`
- `usePostDetailQuery`로 기존 글 데이터 조회

### 2. 기존 데이터 변환
```javascript
// replacePlaceholdersWithUrls()
{{IMG_0}} → http://localhost:8080/uploads/image1.jpg
→ 에디터에 실제 이미지 표시
```

### 3. 사용자 수정
- **기존 이미지**: 실제 URL (`http://...`) → 그대로 유지
- **새 이미지**: blob URL (`blob:...`) → Map에 저장

### 4. 제출 시 변환
```javascript
// replaceImagesWithPlaceholders()
// blob URL만 placeholder로 변환!

기존: <img src="http://localhost:8080/uploads/old.jpg"> → 그대로 유지
새로: <img src="blob:..."> → {{IMG_0}}
새로: <img src="blob:..."> → {{IMG_1}}
```

### 5. 백엔드 전송
```javascript
FormData {
  post: { 
    title, 
    content: "... http://.../old.jpg ... {{IMG_0}} ... {{IMG_1}} ..." 
  }
  files: [새파일1, 새파일2]  // 새로 추가된 이미지만
}
```

---

## 🎯 핵심 로직

### 이미지 처리 전략

#### 1. `replaceImagesWithPlaceholders()`
**역할**: 에디터 HTML → 백엔드 전송용 변환

```javascript
// blob URL만 선별적으로 placeholder 변환
let blobIndex = 0;
images.forEach((img) => {
  const src = img.getAttribute('src');
  if (src?.startsWith('blob:')) {
    img.setAttribute('src', `{{IMG_${blobIndex}}}`);
    blobIndex++;  // blob만 카운트!
  }
  // 실제 URL은 건너뜀
});
```

**왜 blob만?**
- 수정 시 기존 이미지(실제 URL)는 그대로 유지
- 새 이미지(blob)만 placeholder로 변환해서 백엔드에 전송

#### 2. `replacePlaceholdersWithUrls()`
**역할**: 백엔드 응답 → 화면 표시용 변환

```javascript
mediaList.forEach((media) => {
  const placeholder = `{{IMG_${media.order}}}`;
  content = content.replace(
    placeholder,
    BACKEND_BASE_URL + media.url
  );
});
```

---

## 📂 컴포넌트 역할

### PostWriteForm
- `mode`: 'create' | 'edit'
- `initialData`: 수정 시 기존 데이터
- `postId`: 수정 시 글 ID
- 작성/수정 로직 통합 관리

### usePostImageManager
- `handleImageUpload`: 이미지 업로드 처리
- `getImageFiles`: blob URL에 매핑된 File 목록 반환
- `clearImages`: 제출 후 정리

### imageProcessor
- `replaceImagesWithPlaceholders`: blob → placeholder
- `replacePlaceholdersWithUrls`: placeholder → 실제 URL

---

## 🔄 데이터 흐름 요약

```
[작성 모드]
사용자 입력 → blob URL → placeholder → 백엔드
                ↓
            File 전송

[수정 모드]
백엔드 조회 → placeholder → 실제 URL → 에디터 표시
사용자 수정 → 기존 URL 유지 + 새 blob → 선별 placeholder → 백엔드
                                          ↓
                                    새 File만 전송

[조회 모드]
백엔드 응답 → placeholder → 실제 URL → 화면 표시
```
