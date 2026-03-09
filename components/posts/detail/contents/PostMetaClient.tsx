'use client';

import Tag from '@/components/ui/Tag';
import { Heading } from '@/components/ui/Heading';
import UserChip from '@/components/common/UserChip';
import { BsDot } from 'react-icons/bs';
import PostContent from './PostContent';
import { useAuthStore } from '@/lib/store/authStore';
import { formatDate } from '@/lib/utils/formatDate';
import PostOwnerActions from '../ownerActions/PostOwnerActions';
import { PostDetailData } from '@/types/api/postDetail';

interface PostMetaClientProps {
  post: PostDetailData;
  postId: number;
  displayContent: string;
}

// 게시글 메타 정보 컴포넌트 (client)
export default function PostMetaClient({
  post,
  postId,
  displayContent,
}: PostMetaClientProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

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
            {isLoggedIn && (
              <PostOwnerActions
                postId={postId}
                postAuthorId={post.author.memberId}
                isNotice={post.notice}
              />
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
          <span>{`조회 수 ${post.viewCount}`}</span>
          <BsDot />
          <span className="text-primitive-green">{`좋아요 수 ${post.likeCount}`}</span>
        </div>
      </div>

      <div className="py-8 border-t border-b border-primitive-grayPrimary">
        <PostContent html={displayContent} />
      </div>
    </div>
  );
}
