'use client';

import Link from 'next/link';
import { Heading } from '@/components/ui/Heading';
import Tag from '@/components/ui/Tag';
import { PostItem, PostListParams } from '@/types/api/postList';
import { formatDate } from '@/lib/utils/formatDate';
import Sort from './Sort';
import UserChip from '@/components/common/UserChip';

interface PostListProps extends PostListParams {
  categoryTitle: string;
  notices: PostItem[];
  postList: PostItem[];
  currentPostId?: number;
}

export default function PostList({
  categoryTitle,
  notices,
  postList,
  currentPostId,
  category,
  searchTarget,
  searchKeyword,
  page,
  sort,
}: PostListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Heading level={1}>{categoryTitle}</Heading>
        <Sort
          currentPostId={currentPostId}
          category={category}
          searchTarget={searchTarget}
          searchKeyword={searchKeyword}
          page={page}
          sort={sort}
        />
      </div>

      <div className="border border-primitive-graySecond rounded-lg overflow-hidden">
        <table className="table-fixed w-full border-collapse text-center ">
          <caption className="sr-only">게시글 목록</caption>
          <colgroup>
            <col className="w-[100px]" />
            <col />
            <col className="w-[120px]" />
            <col className="w-[120px]" />
            <col className="w-[80px]" />
            <col className="w-[80px]" />
          </colgroup>
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
            {notices.map((notice: PostItem) => (
              <tr
                key={notice.postId}
                className="border-t border-primitive-graySecond bg-primitive-grayThird"
              >
                <td className="px-4 py-3">
                  {notice.notice ? (
                    <Tag variant="notice">공지</Tag>
                  ) : (
                    <Tag>{notice.category.categoryName}</Tag>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`/posts/${notice.postId}?category=${category}&page=${page}&sort=${sort}&currentPostId=${notice.postId}&size=5`}
                      className="truncate max-w-[calc(100%-16px)] hover:underline text-left"
                    >
                      {notice.title}
                    </Link>
                    <span className="font-bold w-fit">
                      {notice.commentCount === 0 ? '' : notice.commentCount}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-second">
                  <UserChip
                    status={notice.author.status}
                    userId={notice.author.memberId.toString()}
                    name={notice.author.nickname}
                  />
                </td>
                <td className="px-4 py-3 text-text-third">
                  {formatDate(notice.createdAt)}
                </td>
                <td className="px-4 py-3 text-text-third">
                  {notice.viewCount}
                </td>
                <td className="px-4 py-3 text-primitive-green font-bold">
                  {notice.likeCount}
                </td>
              </tr>
            ))}
            {postList.map((post: PostItem) => (
              <tr
                key={post.postId}
                className={`border-t border-primitive-graySecond hover:bg-primitive-grayThird 
                ${Number(post.postId) === Number(currentPostId) ? 'bg-primitive-grayThird' : ''}`}
              >
                <td className="px-4 py-3">
                  {post.notice ? (
                    <Tag variant="notice">공지</Tag>
                  ) : (
                    <Tag>{post.category.categoryName}</Tag>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 items-center">
                    <Link
                      href={`/posts/${post.postId}?category=${category}&page=${page}&sort=${sort}&currentPostId=${post.postId}&size=5`}
                      className="truncate max-w-[calc(100%-16px)] hover:underline text-left"
                    >
                      {post.title}
                    </Link>
                    <span className="font-bold w-fit">
                      {post.commentCount === 0 ? '' : post.commentCount}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-second">
                  <UserChip
                    status={post.author.status}
                    userId={post.author.memberId.toString()}
                    name={post.author.nickname}
                  />
                </td>
                <td className="px-4 py-3 text-text-third">
                  {formatDate(post.createdAt)}
                </td>
                <td className="px-4 py-3 text-text-third">{post.viewCount}</td>
                <td className="px-4 py-3 text-primitive-green font-bold">
                  {post.likeCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
