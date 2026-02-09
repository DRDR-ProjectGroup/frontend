'use client';

import Tag from '@/components/ui/Tag';
import { Heading } from '@/components/ui/Heading';
import UserChip from '@/components/common/UserChip';
import { BsDot } from 'react-icons/bs';
import PostContent from './PostContent';
import { usePostDetailQuery } from '@/query/post/usePostDetailQuery';
import { useAuthStore } from '@/lib/store/authStore';
import { formatDate } from '@/lib/utils/formatDate';
import PostOwnerActions from '../ownerActions/PostOwnerActions';
import { replacePlaceholdersWithUrls } from '@/components/posts/write/utils/imageProcessor';

// 게시글 메타 정보 컴포넌트
export default function PostMeta({ postId }: { postId: number }) {
  const {
    data: postDetailResponse,
    isLoading,
    error,
  } = usePostDetailQuery(postId);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userId = useAuthStore((state) => state.userId);
  // const isAdmin = useAuthStore((state) => state.isAdmin); // 백엔드 API 추가 후 사용
  const isAdmin = true;

  if (isLoading) {
    return <div className="py-8 text-center text-text-third">로딩 중...</div>;
  }

  if (
    error ||
    !postDetailResponse ||
    postDetailResponse.code !== 200 ||
    !postDetailResponse.data
  ) {
    return (
      <div className="py-8 text-center text-text-third">
        <p>게시글을 찾을 수 없습니다.</p>
        <p className="text-sm mt-2">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  const post = postDetailResponse.data;

  // placeholder를 실제 이미지 URL로 교체
  const displayContent = replacePlaceholdersWithUrls(
    post.content,
    post.mediaList || [],
  );

  return (
    <div>
      <div className="py-4">
        <div>
          <div className="flex items-center gap-2">
            <Tag>{post.category.categoryName}</Tag>
            {post.notice && <Tag variant="notice">공지</Tag>}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Heading level={1} className="truncate">
              {post.title}
            </Heading>
            {isLoggedIn &&
              (post.author.memberId === Number(userId) || isAdmin) && (
                <PostOwnerActions postId={postId} />
              )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm mt-4 text-text-third">
          <UserChip
            status={post.author.status}
            userId={post.author.memberId.toString()}
            name={post.author.nickname}
          />
          <BsDot />
          <span>{formatDate(post.createdAt)}</span>
          <BsDot />
          <span>{`Views ${post.viewCount}`}</span>
          <BsDot />
          <span className="text-primitive-green">{`Likes ${post.likeCount}`}</span>
        </div>
      </div>

      <div className="py-8 border-t border-b border-primitive-grayPrimary">
        <PostContent html={displayContent} />
      </div>
    </div>
  );
}
