'use client'

import DOMPurify from 'dompurify';
import { useMemo } from 'react';

/**
 * HTML 컨텐츠를 렌더링하는 클라이언트 컴포넌트
 * DOMPurify를 사용하여 XSS 공격으로부터 보호
 */
export default function PostContent({ html }: { html: string }) {
  // 렌더링 중에 HTML 정화 (깜빡임 없음)
  const sanitizedHTML = useMemo(() => {
    if (typeof window === 'undefined') return '';
    
    // DOMPurify 기본 설정 사용 (대부분의 안전한 태그 허용)
    // script, onerror 등 위험한 것들은 자동으로 제거됨
    return DOMPurify.sanitize(html, {
      ADD_TAGS: ['iframe', 'video', 'audio', 'source'],  // 기본에 없는 태그만 추가
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'controls', 'autoplay', 'loop', 'muted', 'preload']  // 미디어 관련 속성 추가
    });
  }, [html]);

  return (
    <div 
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  )
}
