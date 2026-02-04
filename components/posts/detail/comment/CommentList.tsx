'use client';

import { useState } from 'react';
import { useCommentListQuery } from '@/query/comment/useCommentListQuery';
import CommentItem from './CommentItem';
import Pagination from '@/components/common/Pagination';

// 댓글 조회
export default function CommentList({ postId }: { postId: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: commentListResponse,
    isFetching,
    error,
  } = useCommentListQuery({ postId, page: currentPage });

  if (isFetching) return <div>댓글을 불러오는 중 입니다...</div>;
  if (error) return <div>댓글 조회에 실패하였습니다.</div>;

  const commentListData = commentListResponse?.data;
  const commentList = commentListData?.comments;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="border-primitive-graySecond">
      <div className="flex items-center gap-2 text-lg font-medium">
        <strong>댓글</strong>
        <span className="text-primitive-green">
          {commentListData?.totalCount}
        </span>
      </div>
      <div>
        {commentList?.map((comment) => (
          <CommentItem key={comment.commentId} postId={postId} {...comment} />
        ))}
      </div>

      {/* 페이지네이션 */}
      {commentListData && (
        <Pagination
          currentPage={commentListData.currentPage}
          totalPages={commentListData.totalPages}
          onPageChange={handlePageChange}
          showEllipsis={true} // 댓글이 많을 때 ellipsis(...) 표시
          hideOnSinglePage={true} // 페이지가 1개면 숨김
          disabled={isFetching} // 로딩 중에는 비활성화
          className="mt-6"
        />
      )}
    </div>
  );
}
