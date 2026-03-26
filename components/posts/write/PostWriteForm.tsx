'use client';

import { SimpleEditor } from '@/components/tiptap/tiptap-templates/simple/simple-editor';
import type { Editor } from '@tiptap/react';
import { Heading } from '@/components/ui/Heading';
import InputText from '@/components/ui/InputText';
import Button from '@/components/ui/Button';
import { useState, useEffect, useRef } from 'react';
import { getMediaCountInContent } from './utils/imageProcessor';
import { usePostMediaManager } from './hooks/usePostMediaManager';
import SelectCategory from './SelectCategory';
import type { CategoryData } from '@/types/api/category';
import { usePostSubmit } from './hooks/usePostSubmit';
import { buildPostFormData, buildPostPayload } from './utils/postSubmission';

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
  const { submitPost, isPending, isSuccess } = usePostSubmit({ clearMedia });
  const [canSubmit, setCanSubmit] = useState(title && category);

  useEffect(() => {
    setCanSubmit(title && category);
  }, [title, category]);

  // (수정 모드) 에디터에 초기 콘텐츠 설정
  useEffect(() => {
    if (mode === 'edit' && editor && initialData?.content) {
      editor.commands.setContent(initialData.content);
    }
  }, [mode, editor, initialData?.content]);

  // 글 작성 완료 시 수행
  const handleSubmit = async () => {
    if (!editor) return;
    if (!title || !category) {
      alert('제목과 카테고리를 입력해주세요.');
      return;
    }

    try {
      const html = editor.getHTML();
      const newImageFiles = getMediaFiles(html);
      const postPayload = buildPostPayload({
        mode,
        title,
        initialContent: initialData?.content,
        currentHtml: html,
      });
      const formData = buildPostFormData(postPayload, newImageFiles);

      await submitPost({ mode, postId, formData, category });
    } catch (error) {
      console.error('글 처리 실패:', error);
      alert('글 처리에 실패했습니다.');
    }
  };

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
        />

        {/* 제한 안내 문구 */}
        <ul className="text-sm text-primitive-grayText">
          <li>- 이미지, 영상 용량 제한 : 파일당 20mb 이하 가능</li>
          <li>
            - 이미지, 영상 개수 제한 : 이미지와 영상을 합쳐 총 5개까지 등록 가능
          </li>
        </ul>

        {/* 정보 이용 약관 */}
        <div className="mt-4 mb-4">
          <strong className="text-sm text-text-second">정보 이용 약관</strong>
          <ul className="text-sm text-text-third">
            <li>- 글 작성 시, 해당 글은 모든 유저가 열람 가능합니다.</li>
            <li>- 글 저장 기간은 삭제 전까지 유지됩니다.</li>
            <li>
              - 글 삭제 시, 30일 동안 정보는 보관되며, 이후 완전히 삭제됩니다.
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!canSubmit || isPending || isSuccess}
          >
            {isPending && isSuccess
              ? '제출 완료'
              : isPending
                ? '제출 중...'
                : '제출하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
