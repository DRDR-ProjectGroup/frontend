'use client';

import Link from 'next/link';
import { Heading } from '@/components/ui/Heading';
import { usePostListQuery } from '@/query/post/usePostListQuery';
import { usePostListParams } from './PostListParamsContext';
import Tag from '@/components/ui/Tag';
import { PostItem } from '@/types/api/postList';
import { formatDate } from '@/lib/utils/formatDate';
import Sort from './Sort';

export default function PostList({
  currentPostId,
}: {
  currentPostId?: number;
}) {
  const { params } = usePostListParams();
  const {
    data: postListResponse,
    isLoading,
    isError,
    error,
  } = usePostListQuery(params);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    return (
      <div className="text-primitive-red">
        {error instanceof Error
          ? error.message
          : '데이터를 불러오지 못했습니다.'}
      </div>
    );
  }

  const postList = postListResponse?.data?.posts || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Heading level={1}>
          {params.category === 'all' ? '전체 인기글' : params.category}
        </Heading>
        <Sort />
      </div>

      <table className="w-full border-collapse border border-primitive-graySecond rounded-lg text-center ">
        <thead className="bg-primitive-grayWeakest h-[40px] text-xs text-text-second font-bold">
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
          {postList.map((post: PostItem) => (
            <tr
              key={post.postId}
              className={`border border-primitive-graySecond hover:bg-primitive-grayThird 
                ${Number(post.postId) === currentPostId ? 'bg-primitive-grayThird' : ''}`}
            >
              <td className="px-4 py-3">
                <Tag>{post.category.categoryName}</Tag>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/posts/${post.postId}?category=${params.category}&page=${params.page}&sort=${params.sort}`}
                  className="font-bold hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-text-second">
                {post.author.nickname}
              </td>
              <td className="px-4 py-3 text-text-third">
                {formatDate(post.createdAt)}
              </td>
              <td className="px-4 py-3 text-primitive-green">
                {post.viewCount}
              </td>
              <td className="px-4 py-3 text-text-third">{post.likeCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
