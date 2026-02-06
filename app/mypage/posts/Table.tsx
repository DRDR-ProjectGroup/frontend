import { MyPostItem } from '@/types/api/member';
import Tag from '@/components/ui/Tag';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/formatDate';

export default function Table({ posts }: { posts: MyPostItem[] }) {
  return (
    <table className="table-fixed w-full border-collapse text-center ">
      <caption className="sr-only">내 작성글 목록</caption>
      <colgroup>
        <col className="w-1/10" />
        <col />
        <col className="w-1/10" />
        <col className="w-1/10" />
        <col className="w-1/10" />
      </colgroup>
      <thead className="bg-primitive-grayWeakest/80 h-[40px] text-xs text-text-second font-bold">
        <tr className="border-b border-primitive-graySecond">
          <th className="px-4">카테고리</th>
          <th className="px-4">제목</th>
          <th className="px-4">작성일</th>
          <th className="px-4">조회수</th>
          <th className="px-4">추천수</th>
        </tr>
      </thead>
      <tbody className="h-[50px] text-sm">
        {posts.map((post: MyPostItem) => (
          <tr
            key={post.postId}
            className="border-b border-primitive-graySecond hover:bg-primitive-grayThird"
          >
            <td className="px-4 py-3">
              <Tag>{post.category.categoryName}</Tag>
            </td>
            <td className="px-4 py-3">
              <div className="flex gap-2 items-center">
                <Link
                  href={`/posts/${post.postId}`}
                  className="truncate max-w-[calc(100%-16px)] font-bold hover:underline text-left"
                >
                  {post.title}
                </Link>
                <span className="text-xs text-primitive-green w-fit">
                  {`(${post.likeCount})`}
                </span>
              </div>
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
  );
}
