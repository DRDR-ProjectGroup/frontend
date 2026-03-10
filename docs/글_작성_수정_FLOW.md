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
// 기존, 새로 여부 관계 없이 placeholder로 변환!

<img src=""> → {{IMG_0}}
<img src=""> → {{IMG_1}}


```

### 5. 백엔드 전송

- 백엔드에서 글 상세 조회 시 ⇒ mediaId 를 보내줌. 그걸 이용

1. 수정 페이지 진입 → 기존 미디어 태그의 mediaId 들 → 배열로 모아둠 (old_array : { mediaId : order} )
2. 최종 글 작성 시 → 모든 미디어 태그 모은 배열 생성 (final_array) → old_array 랑 비교해서 없는 old_array 를 따로 모아둠 (deleted_array)
   → 새로 추가된 미디어 태그 (old id가 없는놈)을 모아둔 배열 (new_array) : [order index만 저장] 이걸 백엔드에 보냄
3. 백엔드에서 받아야 할 order 번호들
   - old_array { 기존 mediaId : 새로정립된 order }
   - new_array [order1, order4…, 등] & files 따로따로
   - deleted_array(order값 배열) 로 기존 미디어 파일 삭제

```
"post"
{
  "title": "...",
  "content": "<p>...</p><img src=\"{{IMG_0}}\" ...><img src=\"{{IMG_1}}\" ...>",
  "oldMediaIdsAndOrders": {
    "11" : 0,       // 기존 미디어 id : order
    "12" : 2,
    "13" : 4,
  },
  "deletedMediaIds" : [14, 15], // 삭제된 미디어 id 정보들
  "newMediaOrders": [1,3]  // 추가된 미디어의 order
}

"files"
multipart/form-data
```

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

- `replaceImagesWithPlaceholders`: 미디어태그 src → placeholder
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
사용자 수정 → oldMediaIdsAndOrders, deletedMediaIds, newMediaOrders → 백엔드


[조회 모드]
백엔드에서는, 프론트에서 받은 순서&미디어 정보를 기존 글 상세 정보 테이블과 비교하여 order & mediaId를 재작성 => 프론트로 다시 보낼때는 모든 미디어에 대한 order와 mediaId를 보내줌.
```
