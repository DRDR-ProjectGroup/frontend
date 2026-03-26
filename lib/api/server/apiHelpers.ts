import { notFound } from 'next/navigation';
import { apiRequest } from './apiRequest';
import { ApiError } from '@/lib/error/api';

interface ServerApiRequestOptionalParamsType {
  body?: any;
  options?: RequestInit;
  errorMessage?: string;
}

export function getServerApiBaseUrl(): string {
  const url = process.env.BACKEND_API_BASE_URL;
  if (!url) {
    throw new Error('BACKEND_API_BASE_URL is not set');
  }
  return url.replace(/\/$/, '');
}

async function handleServerResponse<T>(
  response: Response,
  errorMessage?: string,
): Promise<T> {
  if (response.status === 404) {
    notFound();
  }

  // JSON 파싱 실패해도 에러 터뜨리지 말고 그냥 빈 객체 {}로 대체
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      data.message || errorMessage || '요청 실패',
      data.code ?? response.status,
    );
  }

  return data as T;
}

export async function serverApiGet<T = any>(
  endpoint: string,
  { options, errorMessage }: ServerApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getServerApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  return handleServerResponse<T>(response, errorMessage);
}

export async function serverApiPost<T = any>(
  endpoint: string,
  { body, options, errorMessage }: ServerApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getServerApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleServerResponse<T>(response, errorMessage);
}

export async function serverApiPut<T = any>(
  endpoint: string,
  { body, options, errorMessage }: ServerApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getServerApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleServerResponse<T>(response, errorMessage);
}

export async function serverApiPatch<T = any>(
  endpoint: string,
  { body, options, errorMessage }: ServerApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getServerApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleServerResponse<T>(response, errorMessage);
}

export async function serverApiDelete<T = any>(
  endpoint: string,
  { body, options, errorMessage }: ServerApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getServerApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return handleServerResponse<T>(response, errorMessage);
}

export async function serverApiPostFormData<T = any>(
  endpoint: string,
  formData: FormData,
  { options, errorMessage }: ServerApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getServerApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'POST',
    body: formData,
  });

  return handleServerResponse<T>(response, errorMessage);
}

export async function serverApiPutFormData<T = any>(
  endpoint: string,
  formData: FormData,
  { options, errorMessage }: ServerApiRequestOptionalParamsType = {},
): Promise<T> {
  const baseUrl = getServerApiBaseUrl();
  const response = await apiRequest(`${baseUrl}${endpoint}`, {
    ...options,
    method: 'PUT',
    body: formData,
  });

  return handleServerResponse<T>(response, errorMessage);
}
