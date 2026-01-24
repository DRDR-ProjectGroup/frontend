'use client'

import { SimpleEditor } from "@/components/tiptap/tiptap-templates/simple/simple-editor";
import type { Editor } from "@tiptap/react"
import { Heading } from "@/components/ui/Heading";
import Select from "@/components/ui/Select";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { getAndClearImageFiles } from "@/lib/tiptap-utils";

/**
 * HTML에서 이미지를 추출하고 placeholder로 교체
 */
function extractAndReplaceImages(html: string): { 
  processedHtml: string
  imageFiles: File[] 
} {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const images = doc.querySelectorAll('img')
  const savedFiles = getAndClearImageFiles()

  images.forEach((img, index) => {
    const src = img.getAttribute('src')
    if (src && src.startsWith('blob:')) {
      // blob URL에 해당하는 파일 찾기
      const matchingFile = savedFiles.find((_, i) => {
        // savedFiles 배열 순서대로 매칭 (업로드 순서 유지)
        return savedFiles.length > 0
      })
      
      // placeholder로 교체
      img.setAttribute('src', `{{IMG_${index}}}`)
      img.setAttribute('data-image-index', String(index))
    }
  })

  return {
    processedHtml: doc.body.innerHTML,
    imageFiles: savedFiles // 업로드된 파일들을 순서대로 반환
  }
}

export default function Page() {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')

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
      // const response = await fetch('/api/posts', {
      //   method: 'POST',
      //   body: formData
      // })
      // const result = await response.json()
      // if (result.code === 200) {
      //   router.push(`/posts/${result.data.postId}`)
      // }

      alert('제출 준비 완료! (콘솔 확인)')

    } catch (error) {
      console.error('글 작성 실패:', error)
      alert('글 작성에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
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

      <SimpleEditor onEditorReady={(editor) => setEditor(editor)}/>

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
