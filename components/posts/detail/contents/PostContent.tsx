'use client';

import Image from 'next/image';
import DOMPurify from 'dompurify';
import { useMemo } from 'react';
import parse, {
  attributesToProps,
  domToReact,
  type DOMNode,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import type { Element } from 'domhandler';

const DEFAULT_IMAGE_ALT = 'post image';

function getDimensionValue(value: unknown): number | null {
  if (typeof value !== 'string') return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function normalizeMediaSrc(src: string): string {
  return src.replace(/\\/g, '/');
}

// DOMPurify 사용 => html 정제 => XSS 공격으로부터 보호
export default function PostContent({ html }: { html: string }) {
  const parsedContent = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const sanitizedHtml = DOMPurify.sanitize(html, {
      ADD_TAGS: ['iframe', 'video', 'audio', 'source'], // 기본에 없는 태그만 추가
      ADD_ATTR: [
        'allow',
        'allowfullscreen',
        'frameborder',
        'controls',
        'autoplay',
        'loop',
        'muted',
        'preload',
        'width',
        'height',
      ], // 미디어 관련 속성 추가
    });

    const options: HTMLReactParserOptions = {
      replace: (node) => {
        if (node.type !== 'tag') return undefined;
        const el = node as Element;

        if (el.name === 'img') {
          const props = attributesToProps(el.attribs);
          const src = typeof props.src === 'string' ? props.src : '';
          if (!src) return null;
          const normalizedSrc = normalizeMediaSrc(src);

          const width = getDimensionValue(props.width);
          const height = getDimensionValue(props.height);

          // width/height가 없을 때는 Next/Image 요구사항 때문에 기본 img로 fallback
          if (!width || !height) {
            return (
              <img
                {...props}
                src={normalizedSrc}
                alt={
                  typeof props.alt === 'string' ? props.alt : DEFAULT_IMAGE_ALT
                }
                loading="lazy"
                decoding="async"
              />
            );
          }

          return (
            <Image
              src={normalizedSrc}
              alt={
                typeof props.alt === 'string' ? props.alt : DEFAULT_IMAGE_ALT
              }
              // CLS(레이아웃 점프) 감소 목적으로 width, height 사용
              width={width}
              height={height}
              loading="lazy"
              className={
                typeof props.className === 'string'
                  ? props.className
                  : undefined
              }
              sizes="(max-width: 768px) 100vw, 1002px"
            />
          );
        }

        if (el.name === 'video') {
          return (
            <video {...attributesToProps(el.attribs)} preload="metadata">
              {domToReact(el.children as DOMNode[], options)}
            </video>
          );
        }

        return undefined;
      },
    };

    return parse(sanitizedHtml, options);
  }, [html]);

  return <div className="prose prose-slate max-w-none">{parsedContent}</div>;
}
