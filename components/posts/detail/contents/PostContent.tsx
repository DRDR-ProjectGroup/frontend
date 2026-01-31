'use client'

import DOMPurify from 'dompurify';
import { useMemo } from 'react';

// DOMPurify 사용 => html 정제 => XSS 공격으로부터 보호
export default function PostContent({ html }: { html: string }) {
  const sanitizedHTML = useMemo(() => {
    if (typeof window === 'undefined') return '';
    
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
