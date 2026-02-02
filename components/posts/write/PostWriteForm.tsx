'use client';

import { SimpleEditor } from '@/components/tiptap/tiptap-templates/simple/simple-editor';
import type { Editor } from '@tiptap/react';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import Button from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/query/post/usePostMutations';
import { replaceImagesWithPlaceholders } from './utils/imageProcessor';
import { usePostImageManager } from './hooks/usePostImageManager';
import { useRouter } from 'next/navigation';
import SelectCategory from './SelectCategory';
import type { Category } from '@/types/api/category';

type PostWriteFormProps = {
  mode?: 'create' | 'edit';
  initialData?: {
    title: string;
    content: string;
    category: Category;
  };
  postId?: string;
};

export default function PostWriteForm({
  mode = 'create',
  initialData,
  postId,
}: PostWriteFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(
    initialData?.category?.categoryAddress || '',
  );
  const [editor, setEditor] = useState<Editor | null>(null);

  const { handleImageUpload, getImageFiles, clearImages } =
    usePostImageManager();
  const createPostMutate = useCreatePostMutation();
  const updatePostMutate = useUpdatePostMutation();

  // 수정 모드일 때 에디터에 초기 콘텐츠 설정
  useEffect(() => {
    if (mode === 'edit' && editor && initialData?.content) {
      editor.commands.setContent(initialData.content);
    }
  }, [mode, editor, initialData?.content]);

  const handleSubmit = async () => {
    if (!editor) return;

    if (!title || !category) {
      alert('제목과 카테고리를 입력해주세요.');
      return;
    }

    try {
      const html = editor.getHTML();
      const processedHtml = replaceImagesWithPlaceholders(html);
      const imageFiles = getImageFiles();

      const formData = new FormData();
      formData.append(
        'post',
        new Blob([JSON.stringify({ title, content: processedHtml })], {
          type: 'application/json',
        }),
      );
      imageFiles.forEach((file) => formData.append('files', file));

      if (mode === 'create') {
        // 글 작성
        createPostMutate.mutate(
          { formData, category },
          {
            onSuccess: (data) => {
              alert('글 작성 완료!');
              if (data.code === 201 && data.data?.postId) {
                router.push(`/posts/${data.data.postId}`);
              }
            },
            onError: (error) => {
              console.error('글 작성 실패:', error);
              alert('글 작성에 실패했습니다.');
            },
          },
        );
      } else if (mode === 'edit') {
        // 글 수정
        if (!postId) {
          alert('글 ID가 없습니다.');
          return;
        }
        updatePostMutate.mutate(
          { postId, formData },
          {
            onSuccess: (data) => {
              alert('글 수정 완료!');
              router.push(`/posts/${postId}`);
            },
            onError: (error) => {
              console.error('글 수정 실패:', error);
              alert('글 수정에 실패했습니다.');
            },
          },
        );
      }
    } catch (error) {
      console.error(`글 ${mode === 'create' ? '작성' : '수정'} 실패:`, error);
      alert(`글 ${mode === 'create' ? '작성' : '수정'}에 실패했습니다.`);
    } finally {
      clearImages();
    }
  };

  const isPending =
    mode === 'create' ? createPostMutate.isPending : updatePostMutate.isPending;

  return (
    <div>
      <Heading level={1}>{mode === 'create' ? '글 쓰기' : '글 수정'}</Heading>

      <div className="mt-6 space-y-4">
        <div>
          <SelectCategory category={category} setCategory={setCategory} />
        </div>

        <div>
          <InputText
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
          />
        </div>

        <SimpleEditor
          onEditorReady={(editor) => setEditor(editor)}
          onImageUpload={handleImageUpload}
        />

        <div className="flex justify-center">
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isPending || !title || !category}
          >
            {isPending
              ? `${mode === 'create' ? '작성' : '수정'} 중...`
              : `${mode === 'create' ? '작성' : '수정'} 완료`}
          </Button>
        </div>
      </div>
    </div>
  );
}
