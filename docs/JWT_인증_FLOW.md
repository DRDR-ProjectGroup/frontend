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
- accessToken을 zustand store(브라우저 메모리)에 저장
- 헤더 컴포넌트 자동 리렌더링 (AfterLogin 표시)
```

### 2. 페이지 새로고침 (자동 로그인)

```
앱 제일 처음 단계 (Providers 컴포넌트) →
refreshToken(Cookie)가 존재한다는 가정하에 -> /api/v1/auth/reissue 호출하여 accessToken 발급
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
    └── auth.ts               # 로그인, 로그아웃, reissue

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
