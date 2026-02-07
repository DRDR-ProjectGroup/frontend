import { MyCommentItem } from '@/types/api/member';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/formatDate';

export default function Table({ comments }: { comments: MyCommentItem[] }) {
  return (
    <table className="table-fixed w-full border-collapse text-center ">
      <caption className="sr-only">내 댓글 목록</caption>
      <colgroup>
        <col />
        <col className="w-[140px]" />
      </colgroup>
      <thead className="bg-primitive-grayWeakest/80 h-[40px] text-xs text-text-second font-bold">
        <tr className="border-b border-primitive-graySecond">
          <th className="px-4">댓글 내용</th>
          <th className="px-4">작성일</th>
        </tr>
      </thead>
      <tbody className="h-[50px] text-sm">
        {comments.map((comment: MyCommentItem, index: number) => (
          <tr
            key={index}
            className="border-b border-primitive-graySecond hover:bg-primitive-grayThird"
          >
            <td className="px-4 py-3 text-left">
              <Link
                href={`/posts/${comment.postId}`}
                className="truncate max-w-[calc(100%-16px)] font-bold hover:underline text-left"
              >
                {comment.content}
              </Link>
            </td>
            <td className="px-4 py-3 text-text-third">
              {formatDate(comment.createdAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
