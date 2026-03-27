export class ApiError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}

export function getErrorMessage(
  error: unknown,
  fallback = '오류가 발생했습니다',
): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}
