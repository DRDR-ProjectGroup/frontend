import { PostListResponse } from '@/types/api/postList';

export type PostListParams = {
  category?: string;
  page?: number;
  size?: number;
  searchTarget?: string;
  searchKeyword?: string;
  sort?: 'POPULAR' | 'LATEST';
};

// 순수 fetch 로직 - baseUrl을 외부에서 주입받음
export async function fetchPostListServer(
  baseUrl: string,
  params: PostListParams = {},
): Promise<PostListResponse | null> {
  const {
    category = '',
    page = 1,
    size = 20,
    searchTarget = '',
    searchKeyword = '',
    sort = 'POPULAR',
  } = params;

  try {
    const response = await fetch(
      `${baseUrl}/posts?cat=${category}&page=${page}&size=${size}&searchTarget=${searchTarget}&searchKeyword=${searchKeyword}&sort=${sort}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    );
    const data: PostListResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
