# JWT 인증 시스템 구현

## 개요

이 프로젝트는 JWT 액세스 토큰과 리프레시 토큰을 사용한 인증 시스템을 구현했습니다.

## 인증 플로우

### 1. 로그인
```
사용자 로그인 → 백엔드 응답:
- Authorization 헤더: Bearer ACCESS_TOKEN
- Set-Cookie: refreshToken=REFRESH_TOKEN; HttpOnly
- Body: { code: 200, message: "로그인 성공" }

→ 프론트엔드 처리:
- accessToken을 localStorage에 저장
- Zustand store 업데이트
- 헤더 컴포넌트 자동 리렌더링 (AfterLogin 표시)
```

### 2. 페이지 새로고침 (자동 로그인)
```
앱 초기화 (Providers 컴포넌트) →
localStorage에서 accessToken 확인 →
토큰 만료 여부 확인:
  - 유효함: 그대로 사용
  - 만료됨: /api/v1/auth/reissue 호출하여 재발급
  - 재발급 실패: 로그아웃 처리
```

### 3. API 호출 중 401 에러
```
API 요청 (예: 글 작성) →
백엔드 응답 401 Unauthorized →
apiClient가 자동으로:
  1. /api/v1/auth/reissue 호출
  2. 성공: 새 토큰으로 원래 요청 재시도
  3. 실패: 로그아웃 처리 + 로그인 페이지 이동
```

### 4. 로그아웃
```
사용자가 로그아웃 클릭 →
/api/v1/members/logout 호출 (refreshToken 무효화) →
localStorage에서 accessToken 삭제 →
Zustand store 초기화 →
로그인 페이지로 이동
```

## 파일 구조

```
lib/
├── store/
│   └── authStore.ts          # Zustand 인증 상태 관리
├── utils/
│   └── auth-token.ts         # JWT 토큰 유틸리티 함수
└── api/
    ├── apiClient.ts          # API 요청 클라이언트 (401 자동 처리)
    └── client/
        └── post.ts           # Post API (apiClient 사용)

actions/
└── auth/
    ├── login.actions.ts      # 로그인 Server Action
    └── logout.actions.ts     # 로그아웃 Server Action

components/
└── layout/
    └── header/
        ├── Header.tsx        # 헤더 (인증 상태에 따라 UI 변경)
        ├── AfterLogin.tsx    # 로그인 후 메뉴
        └── BeforeLogin.tsx   # 로그인 전 메뉴

app/
├── providers.tsx             # 앱 초기화 (인증 상태 초기화)
└── (auth)/
    └── login/
        └── LoginForm.tsx     # 로그인 폼
```

## 주요 기능

### 1. authStore.ts (Zustand Store)
- `setAuth(token)`: 로그인 시 토큰 저장 및 상태 업데이트
- `clearAuth()`: 로그아웃 시 상태 초기화
- `initAuth()`: 앱 초기화 시 토큰 확인 및 재발급

### 2. auth-token.ts (JWT 유틸리티)
- `decodeJWT()`: JWT 토큰 디코딩
- `isTokenExpired()`: 토큰 만료 여부 확인
- `getUserIdFromToken()`: 토큰에서 사용자 ID 추출
- `getAccessToken()`: localStorage에서 토큰 가져오기
- `setAccessToken()`: localStorage에 토큰 저장
- `removeAccessToken()`: localStorage에서 토큰 삭제

### 3. apiClient.ts (API 클라이언트)
- `apiRequest()`: fetch wrapper, 401 에러 시 자동으로 토큰 재발급
- `apiGet()`, `apiPost()`, `apiPut()`, `apiDelete()`: HTTP 메서드 헬퍼
- `apiPostFormData()`, `apiPutFormData()`: FormData 전송용 헬퍼

## 사용 방법

### 로그인
```typescript
// LoginForm.tsx
const setAuth = useAuthStore((state) => state.setAuth);

// 로그인 성공 후
if (state?.ok && state.accessToken) {
  setAuth(state.accessToken); // 자동으로 localStorage에 저장 + 상태 업데이트
  router.push('/');
}
```

### 로그아웃
```typescript
// AfterLogin.tsx
const clearAuth = useAuthStore((state) => state.clearAuth);

const handleLogout = async () => {
  await logoutAction(); // 백엔드 로그아웃 API 호출
  clearAuth(); // 프론트엔드 상태 초기화
  router.push('/login');
};
```

### API 호출
```typescript
// lib/api/client/post.ts
import { apiRequest } from '@/lib/api/apiClient';

export async function createPost(formData: FormData) {
  const res = await apiRequest(`${baseUrl}/posts/${category}`, {
    method: 'POST',
    body: formData,
  });
  // apiRequest가 자동으로 Authorization 헤더 추가
  // 401 에러 시 자동으로 토큰 재발급 시도
  return res.json();
}
```

### 헤더에서 인증 상태 사용
```typescript
// Header.tsx
const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
const userId = useAuthStore((state) => state.userId);

return (
  <header>
    {isLoggedIn ? <AfterLogin userId={userId} /> : <BeforeLogin />}
  </header>
);
```

## 환경변수

```env
BACKEND_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_BACKEND_API_BASE_URL=http://localhost:8080/api/v1
```

## 백엔드 API

### 로그인
- **Endpoint**: `POST /members/login`
- **Request**: `{ username, password }`
- **Response**:
  - Headers: `Authorization: Bearer ACCESS_TOKEN`
  - Set-Cookie: `refreshToken=REFRESH_TOKEN; HttpOnly`
  - Body: `{ code: 200, message: "로그인 성공" }`

### 토큰 재발급
- **Endpoint**: `POST /api/v1/auth/reissue`
- **Request**: 쿠키에 refreshToken 포함
- **Response**:
  - Headers: `Authorization: Bearer NEW_ACCESS_TOKEN`
  - Body: `{ code: 200, message: "토큰 재발급 성공" }`

### 로그아웃
- **Endpoint**: `POST /api/v1/members/logout`
- **Request**: 쿠키에 refreshToken 포함
- **Response**: `{ code: 200, message: "로그아웃 성공" }`

## 보안 고려사항

1. **액세스 토큰**: localStorage에 저장 (짧은 유효기간 권장)
2. **리프레시 토큰**: HTTP-only 쿠키로 저장 (JavaScript 접근 불가)
3. **HTTPS**: 프로덕션 환경에서 필수
4. **CORS**: `credentials: 'include'` 사용 시 백엔드 CORS 설정 필요
   ```
   Access-Control-Allow-Credentials: true
   Access-Control-Allow-Origin: https://yourdomain.com
   ```

## 의존성

```json
{
  "zustand": "^4.x.x",
  "@tanstack/react-query": "^5.x.x"
}
```

## 설치

```bash
npm install zustand
```

## 테스트 시나리오

1. **로그인 테스트**
   - 로그인 → 헤더에 "로그아웃" 버튼 표시 확인

2. **페이지 새로고침 테스트**
   - 로그인 후 새로고침 → 로그인 상태 유지 확인

3. **토큰 만료 테스트**
   - 로그인 후 토큰 만료 시간 대기 → API 호출 → 자동 재발급 확인

4. **로그아웃 테스트**
   - 로그아웃 → 헤더에 "로그인" 버튼 표시 확인
   - 로그아웃 후 보호된 페이지 접근 → 로그인 페이지로 리다이렉트 확인
