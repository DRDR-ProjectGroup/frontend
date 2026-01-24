'use client';

import Link from 'next/link';
import { Heading } from '../ui/Heading';
import { usePostListQuery } from '@/query/post/usePostListQuery';
import { usePostListParams } from './postListParamsContext';

export default function PostList() {
  const { params } = usePostListParams();
  const { data: postListResponse, isLoading, isError, error } =
    usePostListQuery(params);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return (
      <div className="text-primitive-red">
        {error instanceof Error ? error.message : '데이터를 불러오지 못했습니다.'}
      </div>
    );
  }

  const postList = postListResponse?.data?.posts || [];

  return (
    <div>
      {/* 글 카테고리 */}
      <Heading level={1} className="mb-6">
        {params.category === 'all' ? '전체 인기글' : params.category}
      </Heading>

      {/* 리스트 테이블 */}
      <table className="w-full border-collapse border border-primitive-graySecond rounded-lg">
        <thead className="bg-primitive-grayWeakest h-[40px] text-xs text-text-second font-bold text-left">
          <tr>
            <th className="px-4">카테고리</th>
            <th className="px-4">제목</th>
            <th className="px-4">작성자</th>
            <th className="px-4">작성일</th>
            <th className="px-4">조회수</th>
            <th className="px-4">추천수</th>
          </tr>
        </thead>
        <tbody className="h-[50px] text-sm">
          {postList.map((post) => (
            <tr key={post.postId} className="border border-primitive-graySecond hover:bg-primitive-grayThird">
              <td className="px-4 py-3"><span className="font-bold text-text-second px-2 py-1 bg-primitive-grayThird rounded-sm">{post.category}</span></td>
              <td className="px-4 py-3"><Link href={`/posts/${post.postId}`} className="font-bold hover:underline">{post.title}</Link></td>
              <td className="px-4 py-3 text-text-second">{post.author}</td>
              <td className="px-4 py-3 text-text-third">{post.createdAt}</td>
              <td className="px-4 py-3 text-primitive-green">{post.viewCount}</td>
              <td className="px-4 py-3 text-text-third">{post.likeCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>);
}