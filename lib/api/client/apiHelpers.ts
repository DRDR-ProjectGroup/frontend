import { apiRequest } from './apiRequest';
import { RequireAuthOptions } from '@/types/api/auth';
import { ApiError } from '../../error/api';

interface ApiRequestOptionalParamsType {
  body?: any;
  options?: RequestInit;
  errorMessage?: string;
  requireAuthOptions?: RequireAuthOptions;
}

/**
 * 환경변수에서 API Base URL 가져오기
 */
export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_BACKEND_API_BASE_URL is not set');
  }
  return url.replace(/\/$/, '');
}

/**
 * GET 요청 헬퍼
 */
export async function apiGet<T = any>(
  endpoint: string,
  {
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || errorMessage, error.code);
  }

  return response.json();
}

/**
 * POST 요청 헬퍼
 */
export async function apiPost<T = any>(
  endpoint: string,
  {
    body,
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || errorMessage, error.code);
  }

  return response.json();
}

/**
 * PUT 요청 헬퍼
 */
export async function apiPut<T = any>(
  endpoint: string,
  {
    body,
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || errorMessage, error.code);
  }

  return response.json();
}

/**
 * PATCH 요청 헬퍼
 */
export async function apiPatch<T = any>(
  endpoint: string,
  {
    body,
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || errorMessage, error.code);
  }

  return response.json();
}

/**
 * DELETE 요청 헬퍼
 */
export async function apiDelete<T = any>(
  endpoint: string,
  {
    body,
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || errorMessage, error.code);
  }

  return response.json();
}

/**
 * FormData 전송용 POST 요청 헬퍼
 */
export async function apiPostFormData<T = any>(
  endpoint: string,
  formData: FormData,
  {
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'POST',
      body: formData,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || errorMessage, error.code);
  }

  return response.json();
}

/**
 * FormData 전송용 PUT 요청 헬퍼
 */
export async function apiPutFormData<T = any>(
  endpoint: string,
  formData: FormData,
  {
    options,
    errorMessage,
    requireAuthOptions = { requireAuth: false },
  }: ApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await apiRequest(
    `${baseUrl}${endpoint}`,
    {
      ...options,
      method: 'PUT',
      body: formData,
    },
    requireAuthOptions,
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || errorMessage, error.code);
  }

  return response.json();
}
