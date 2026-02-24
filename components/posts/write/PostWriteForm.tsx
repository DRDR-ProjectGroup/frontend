'use client';

import { SimpleEditor } from '@/components/tiptap/tiptap-templates/simple/simple-editor';
import type { Editor } from '@tiptap/react';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import Button from '@/components/ui/Button';
import { useState, useEffect, useRef } from 'react';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/query/post/usePostMutations';
import {
  replaceImagesWithPlaceholders,
  getMediaCountInContent,
} from './utils/imageProcessor';
import { usePostMediaManager } from './hooks/usePostMediaManager';
import { useRouter } from 'next/navigation';
import SelectCategory from './SelectCategory';
import type { CategoryData } from '@/types/api/category';
import { buildEditMediaPayload } from './utils/mediaDiff';

type PostWriteFormProps = {
  mode: 'create' | 'edit';
  initialData?: {
    title: string;
    content: string;
    category: CategoryData;
  };
  postId?: number;
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
  const editorRef = useRef<Editor | null>(null);
  editorRef.current = editor;

  const getEditorHtml = () => editorRef.current?.getHTML() ?? '';
  const { handleMediaUpload, getMediaFiles, clearMedia } = usePostMediaManager({
    getEditorHtml,
  });
  const createPostMutate = useCreatePostMutation();
  const updatePostMutate = useUpdatePostMutation();

  // (수정 모드) 에디터에 초기 콘텐츠 설정
  useEffect(() => {
    if (mode === 'edit' && editor && initialData?.content) {
      editor.commands.setContent(initialData.content);
    }
  }, [mode, editor, initialData?.content]);

  // 글 작성 or 수정 api 호출
  function submitPostMutation({
    mode,
    postId,
    formData,
    category,
  }: {
    mode: 'create' | 'edit';
    postId?: number;
    formData: FormData;
    category: string;
  }) {
    if (mode === 'create') {
      return createPostMutate.mutate(
        { formData, category },
        {
          onSuccess: (data) => {
            clearMedia();
            alert('글 작성 완료!');
            if (data.code === 201 && data.data?.postId) {
              router.push(`/posts/${data.data.postId}`);
            }
          },
          onError: (error) => {
            console.error('글 작성 실패:', error);
          },
        },
      );
    }

    if (mode === 'edit') {
      if (!postId) {
        alert('글 ID가 없습니다.');
        return;
      }

      return updatePostMutate.mutate(
        { postId, formData },
        {
          onSuccess: (data) => {
            clearMedia();
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
  }

  // 글 작성 완료 시 수행
  const handleSubmit = async () => {
    if (!editor) return;
    if (!title || !category) {
      alert('제목과 카테고리를 입력해주세요.');
      return;
    }

    try {
      const html = editor.getHTML();
      const processedHtml = replaceImagesWithPlaceholders(html);
      const newImageFiles = getMediaFiles(html);

      // 1. 기본 payload
      let postPayload = {
        title,
        content: processedHtml,
      };
      console.log('postPayload', postPayload);

      // 2. edit이면 mediaDiff (html 내 미디어 파일 변경 정보) 추가
      if (mode === 'edit') {
        if (!postId) {
          alert('글 ID가 없습니다.');
          return;
        }

        const mediaPayload = buildEditMediaPayload(
          initialData?.content || '',
          html,
        );

        postPayload = {
          ...postPayload,
          ...mediaPayload,
        };
      }

      // 3. formData는 공통
      const formData = new FormData();
      formData.append(
        'post',
        new Blob([JSON.stringify(postPayload)], {
          type: 'application/json',
        }),
      );

      newImageFiles.forEach((file) => formData.append('files', file));

      // 4. submit 실행
      submitPostMutation({ mode, postId, formData, category });
    } catch (error) {
      console.error('글 처리 실패:', error);
      alert('글 처리에 실패했습니다.');
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
          onEditorReady={(e) => {
            editorRef.current = e;
            setEditor(e);
          }}
          onMediaUpload={handleMediaUpload}
          countMediaInHtml={getMediaCountInContent}
          onPasteComplete={() => {
            console.log(
              '[붙여넣기 후] 전체 미디어 개수:',
              getMediaCountInContent(getEditorHtml()),
            );
          }}
        />

        {/* 제한 안내 문구 */}
        <ul className="text-sm text-primitive-grayText">
          <li>- 이미지, 영상 용량 제한 : 파일당 20mb 이하 가능</li>
          <li>
            - 이미지, 영상 개수 제한 : 이미지와 영상을 합쳐 총 5개까지 등록 가능
          </li>
        </ul>

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
