'use client'

import { SimpleEditor } from "@/components/tiptap/tiptap-templates/simple/simple-editor";
import type { Editor } from "@tiptap/react"
import { Heading } from "@/components/ui/Heading";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useCreatePostMutation } from "@/query/post/usePostMutations";
import { replaceImagesWithPlaceholders } from "./utils/imageProcessor";
import { usePostImageManager } from "./hooks/usePostImageManager";
import { useRouter } from "next/navigation";
import SelectCategory from "./SelectCategory";

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [editor, setEditor] = useState<Editor | null>(null);
  
  const { handleImageUpload, getImageFiles, clearImages } = usePostImageManager();
  const createPostMutate = useCreatePostMutation();

  const handleSubmit = async () => {
    if (!editor) return  // null 체크
  
    if (!title || !category) {
      alert('제목과 카테고리를 입력해주세요.')
      return
    }
  
    try {
      const html = editor.getHTML();
      const processedHtml = replaceImagesWithPlaceholders(html);
      const imageFiles = getImageFiles();
      
      const formData = new FormData();
      formData.append('post', new Blob([JSON.stringify({ title, content: processedHtml })], {
        type: 'application/json',
      }));
      imageFiles.forEach(file => formData.append('files', file));
      
      createPostMutate.mutate({ formData, category }, {
        onSuccess: (data) => {
          alert('글 작성 완료!')
          if (data.code === 201 && data.data?.postId) {
            router.push(`/posts/${data.data.postId}`)
          }
        },
        onError: (error) => {
          console.error('글 작성 실패:', error);
          alert('글 작성에 실패했습니다.');
        },
      })
    } catch (error) {
      console.error('글 작성 실패:', error);
      alert('글 작성에 실패했습니다.');
    } finally {
      clearImages();  // 제출 후 정리
    }
  }

  return <div>
    <Heading level={1}>글 쓰기</Heading>

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
          disabled={createPostMutate.isPending || !title || !category}
        >
          {createPostMutate.isPending ? '작성 중...' : '작성 완료'}
        </Button>
      </div>
    </div>
  </div>;
}
