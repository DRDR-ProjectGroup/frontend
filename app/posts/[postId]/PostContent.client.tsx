'use client'

/**
 * HTML 컨텐츠를 렌더링하는 클라이언트 컴포넌트
 * (dangerouslySetInnerHTML 사용을 위해 클라이언트 컴포넌트로 분리)
 */
export default function PostContent({ html }: { html: string }) {
  return (
    <div 
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
