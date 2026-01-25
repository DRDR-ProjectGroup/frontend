'use client'

import { SimpleEditor } from "@/components/tiptap/tiptap-templates/simple/simple-editor";
import type { Editor } from "@tiptap/react"
import { Heading } from "@/components/ui/Heading";
import Select from "@/components/ui/Select";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import { useState, useRef, useCallback } from "react";
import { MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [editor, setEditor] = useState<Editor | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  
  // 컴포넌트별로 독립적인 이미지 파일 관리
  const imageFilesMap = useRef(new Map<string, File>())

  /**
   * 이미지 업로드 핸들러 (SimpleEditor에 전달)
   */
  const handleImageUpload = useCallback(async (
    file: File,
    onProgress?: (event: { progress: number }) => void,
    abortSignal?: AbortSignal
  ): Promise<string> => {
    // Validate file
    if (!file) {
      throw new Error("No file provided")
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`
      )
    }

    // 진행률 시뮬레이션 (미리보기용)
    for (let progress = 0; progress <= 100; progress += 20) {
      if (abortSignal?.aborted) {
        throw new Error("Upload cancelled")
      }
      await new Promise((resolve) => setTimeout(resolve, 100))
      onProgress?.({ progress })
    }

    // Blob URL 생성 (미리보기용)
    const blobUrl = URL.createObjectURL(file)
    
    // 나중에 제출 시 사용하기 위해 File 저장
    imageFilesMap.current.set(blobUrl, file)

    return blobUrl
  }, [])

  /**
   * HTML에서 이미지를 추출하고 placeholder로 교체
   */
  const extractAndReplaceImages = useCallback((html: string): { 
    processedHtml: string
    imageFiles: File[] 
  } => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const images = doc.querySelectorAll('img')
    
    // 저장된 이미지 파일 가져오기
    const savedFiles = Array.from(imageFilesMap.current.values())

    images.forEach((img, index) => {
      const src = img.getAttribute('src')
      if (src && src.startsWith('blob:')) {
        // placeholder로 교체
        img.setAttribute('src', `{{IMG_${index}}}`)
        img.setAttribute('data-image-index', String(index))
      }
    })

    return {
      processedHtml: doc.body.innerHTML,
      imageFiles: savedFiles
    }
  }, [])

  const handleSubmit = async () => {
    if (!editor) return

    if (!title || !category) {
      alert('제목과 카테고리를 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const html = editor.getHTML()
      
      // HTML에서 이미지 추출 및 placeholder로 교체
      const { processedHtml, imageFiles } = extractAndReplaceImages(html)

      // FormData 생성
      const formData = new FormData()
      
      // JSON 데이터 (name="post")
      formData.append('post', JSON.stringify({
        title,
        category,
        content: processedHtml
      }))

      // 이미지 파일들 (name="files")
      imageFiles.forEach((file) => {
        formData.append('files', file)
      })

      console.log('=== 제출 데이터 ===')
      console.log('Title:', title)
      console.log('Category:', category)
      console.log('Content (with placeholders):', processedHtml)
      console.log('Image files:', imageFiles.map(f => f.name))

      // TODO: 실제 API 호출
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/posts/${category}`, 
          {
          method: 'POST',
          body: formData
        }
      )
      const result = await response.json()
      if (result.code === 201) {
        router.push(`/posts/${result.data.postId}`)
      }

      alert('제출 준비 완료! (콘솔 확인)')

    } catch (error) {
      console.error('글 작성 실패:', error)
      alert('글 작성에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
      // 제출 후 이미지 맵 초기화
      imageFilesMap.current.clear()
    }
  }

  return <div>
    <Heading level={1}>글 쓰기</Heading>

    <div className="mt-6 space-y-4">
      <div>
        <Select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">카테고리 선택</option>
          <option value="pc_game">PC game</option>
          <option value="console_game">Console game</option>
          <option value="mobile_game">Mobile game</option>
          <option value="movie">Movie</option>
          <option value="music">Music</option>
          <option value="book">Book</option>
          <option value="art">Art</option>
          <option value="other">Other</option>
        </Select>
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
          disabled={isSubmitting || !title || !category}
        >
          {isSubmitting ? '작성 중...' : '작성 완료'}
        </Button>
      </div>
    </div>
  </div>;
}
