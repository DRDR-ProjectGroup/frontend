'use client'

import Tag from "@/components/ui/Tag";
import { Heading } from "@/components/ui/Heading";
import UserChip from "@/components/common/UserChip";
import { BsDot } from "react-icons/bs";
import PostContent from "./PostContent";
import type { MediaItem } from "@/types/api/postDetail";
import { usePostDetailQuery } from "@/query/post/usePostDetailQuery";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/authStore";
import { useDeletePostMutation } from "@/query/post/usePostMutations";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils/formatDate";

// 게시글 메타 정보 컴포넌트
export default function PostMeta({ postId }: { postId: string }) {
  const router = useRouter();
  const { mutate: deletePostMutation } = useDeletePostMutation();
  const { data: postDetailResponse, isLoading, error } = usePostDetailQuery(postId);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userId = useAuthStore((state) => state.userId);

  if (isLoading) {
    return (
      <div className="py-8 text-center text-text-third">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error || !postDetailResponse || postDetailResponse.code !== 200 || !postDetailResponse.data) {
    return (
      <div className="py-8 text-center text-text-third">
        <p>게시글을 찾을 수 없습니다.</p>
        <p className="text-sm mt-2">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  const post = postDetailResponse.data;

  // placeholder를 실제 이미지 URL로 교체
  const displayContent = replacePlaceholders(post.content, post.mediaList || []);

  return (
    <div>
      <div className="py-4">
        <div>
          <div className="flex items-center justify-between">
            <Tag>{post.category.categoryName}</Tag>
            {isLoggedIn && post.author.memberId === Number(userId) && (
              <div className="flex items-center gap-2">
                <Button variant="primary">수정</Button>
                <Button 
                  variant="secondary"
                  onClick={ () => {
                    deletePostMutation(postId, {
                      onSuccess: () => {
                        router.push('/');
                      },
                      onError: (error) => {
                        alert("글 삭제에 실패하였습니다.");
                        router.push('/');
                        console.error(error);
                      },
                    });
                }}
                >삭제</Button>
              </div>
            )}
          </div>

        </div>
        <Heading level={1} className="mt-3">{post.title}</Heading>
        <div className="flex items-center gap-2 text-sm mt-4 text-text-third">
          <UserChip name={post.author.nickname} />
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

// placeholder를 실제 이미지 URL로 교체
function replacePlaceholders(content: string, mediaList: MediaItem[]) {
  let processedContent = content;
  
  mediaList.forEach((media) => {
    const placeholder = `{{IMG_${media.order}}}`;
    processedContent = processedContent.replace(placeholder, (process.env.NEXT_PUBLIC_BACKEND_BASE_URL + media.url));
  });
  
  return processedContent;
}