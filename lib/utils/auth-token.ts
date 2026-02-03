// JWT 토큰 관련 유틸리티 함수
interface JWTPayload {
  userId?: string;
  sub?: string;
  exp?: number;
  [key: string]: any;
}

// JWT 토큰 디코딩
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

// JWT 토큰 만료 확인
export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeJWT(token);
    if (!payload?.exp) return true;

    // exp는 초 단위, Date.now()는 밀리초 단위
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

// JWT 토큰에서 사용자 ID 추출
export function getUserIdFromToken(token: string): string | null {
  const payload = decodeJWT(token);
  if (!payload) return null;

  // 백엔드 JWT 구조에 따라 userId 또는 sub 필드 사용
  return payload.userId || payload.sub || null;
}

// localStorage에서 액세스 토큰 가져오기
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

// localStorage에 액세스 토큰 저장
export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', token);
}

// localStorage에서 액세스 토큰 삭제
export function removeAccessToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
}
