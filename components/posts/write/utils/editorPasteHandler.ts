import type { Editor } from '@tiptap/react';

// ---------------------------------------------------------------------------
// 타입
// ---------------------------------------------------------------------------

/** 미디어 업로드 시 파일을 받아 서버 업로드 후 URL을 반환하는 함수 */
export type MediaUploadHandler = (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal,
) => Promise<string>;

/** createPasteHandler에 넘기는 옵션 */
export type PasteHandlerOptions = {
  /** 에디터 인스턴스 ref (핸들러 내부에서 insertContent 등 호출용) */
  editorRef: { current: Editor | null };
  /** 파일 업로드 함수 (blob → 서버 업로드 → URL) */
  onMediaUpload: MediaUploadHandler;
  /** HTML 문자열 내 미디어 개수 세기 (5개 제한·로그용). 없으면 미디어 개수 검사 안 함 */
  countMediaInHtml?: (html: string) => number;
  /** blob 없는 붙여넣기(서버 URL 등) 후 호출. 합산 개수 로그용 */
  onPasteComplete?: () => void;
};

// ---------------------------------------------------------------------------
// MIME → 확장자 (붙여넣은 blob을 File로 만들 때 파일명 확장자용)
// ---------------------------------------------------------------------------

/** MIME 타입 → 파일 확장자 매핑 (이미지/비디오) */
const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/bmp': 'bmp',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
  'video/x-msvideo': 'avi',
  'video/x-matroska': 'mkv',
  'video/ogg': 'ogv',
};

/** 경로 제거 후 파일명만 반환 (붙여넣기 시 data-filename 보존용) */
function basename(name: string): string {
  const part = name.split(/[/\\]/).pop();
  return part && part.length > 0 ? part : name;
}

/** MIME에서 확장자 추출. 없으면 / 뒤 부분 또는 이미지면 png, 비디오면 mp4 */
function getExtensionFromMime(mime: string, isVideo: boolean): string {
  const lower = mime.toLowerCase();
  if (MIME_TO_EXT[lower]) return MIME_TO_EXT[lower];
  const part = lower.split('/')[1];
  if (part && /^[a-z0-9+-]+$/i.test(part)) return part;
  return isVideo ? 'mp4' : 'png';
}

// ---------------------------------------------------------------------------
// HTML 내 blob 미디어 추출 (붙여넣기 HTML에 blob URL이 있는지 판별)
// ---------------------------------------------------------------------------

/** HTML에서 blob URL과 data-filename 추출. img/video 태그 순서대로 */
function extractBlobMediaFromHtml(
  html: string,
): { url: string; isVideo: boolean; filename?: string }[] {
  const list: { url: string; isVideo: boolean; filename?: string }[] = [];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('img[src^="blob:"], video[src^="blob:"]').forEach((el) => {
    const src = el.getAttribute('src');
    if (!src) return;
    const isVideo = el.tagName.toLowerCase() === 'video';
    const filename = el.getAttribute('data-filename') ?? undefined;
    list.push({ url: src, isVideo, filename });
  });
  return list;
}

// ---------------------------------------------------------------------------
// 붙여넣기 HTML 정리: data-media-id 제거 (복붙 시 기존 mediaId가 따라오는 것 방지)
// ---------------------------------------------------------------------------

/** img, video의 data-media-id 속성 제거 후 HTML 문자열 반환 */
function stripDataMediaIdFromHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc
    .querySelectorAll('img[data-media-id], video[data-media-id]')
    .forEach((el) => el.removeAttribute('data-media-id'));
  return doc.body.innerHTML;
}

// ---------------------------------------------------------------------------
// 붙여넣기 HTML 정리: blob이 아닌 URL 미디어에 data-skip-placeholder 표시
// (수정 완료 시 placeholder 치환에서 제외하기 위함. 이미 DB에 있는 URL은 치환하면 안 됨)
// ---------------------------------------------------------------------------

const SKIP_PLACEHOLDER_ATTR = 'data-skip-placeholder';

// src가 blob URL이 아닌 img, video, source에 data-skip-placeholder 추가. 수정 제출 시 placeholder 치환 제외용
function markPastedUrlMediaInHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('img, video, source').forEach((el) => {
    const src = el.getAttribute('src');
    if (src && !src.startsWith('blob:')) {
      el.setAttribute(SKIP_PLACEHOLDER_ATTR, '1');
    }
  });
  return doc.body.innerHTML;
}

// ---------------------------------------------------------------------------
// ProseMirror paste 이벤트 핸들러 생성
// ---------------------------------------------------------------------------

/**
 * 에디터용 paste DOM 이벤트 핸들러를 만듭니다.
 * - 클립보드에 파일이 있으면 false 반환 → FileHandler가 처리
 * - HTML에 blob URL이 있으면 blob → 업로드 → insertContent
 * - HTML에 blob이 없으면 (일반 텍스트/이미지 URL 등) media-id 제거 + URL 미디어에 skip 표시 후 insertContent
 */
export function createPasteHandler(options: PasteHandlerOptions) {
  const { editorRef, onMediaUpload, countMediaInHtml, onPasteComplete } =
    options;

  return function handlePaste(_view: unknown, ev: Event): boolean {
    const e = ev as ClipboardEvent;
    const data = e.clipboardData;
    if (!data) return false;

    // 클립보드에 파일이 있으면 기본 동작 막지 않고 FileHandler에 맡김
    const filesLength = data.files?.length ?? 0;
    if (filesLength > 0) return false;

    const html = data.getData('text/html');
    const blobMedia = extractBlobMediaFromHtml(html);

    // ---------- 케이스 1: blob URL이 없음 (일반 텍스트 또는 이미 서버 URL인 미디어만 있음) ----------
    if (blobMedia.length === 0) {
      const pastedCount = countMediaInHtml?.(html) ?? 0;
      const currentCount =
        countMediaInHtml?.(editorRef.current?.getHTML() ?? '') ?? 0;
      // 미디어가 있고, 현재 + 붙여넣기 합이 5개 초과면 붙여넣기 막음
      if (pastedCount > 0 && currentCount + pastedCount > 5) {
        e.preventDefault();
        e.stopPropagation();
        alert('최대 5개의 파일만 업로드할 수 있습니다.');
        return true;
      }
      e.preventDefault();
      const completedHtml = markPastedUrlMediaInHtml(html);
      editorRef.current?.chain().focus().insertContent(completedHtml).run();
      if (pastedCount > 0 && onPasteComplete) {
        setTimeout(() => onPasteComplete(), 0);
      }
      return true;
    }

    // ---------- 케이스 2: blob URL이 있음 → fetch → 업로드 → 에디터에 삽입 ----------
    e.preventDefault();
    e.stopPropagation();

    Promise.all(
      blobMedia.map(({ url, isVideo, filename: pastedFilename }) =>
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            const ext = getExtensionFromMime(blob.type, isVideo);
            const base =
              pastedFilename && pastedFilename.trim().length > 0
                ? basename(pastedFilename.trim())
                : `pasted-${isVideo ? 'video' : 'image'}`;
            const safeName =
              base.includes('.') ? base : `${base}.${ext}`;
            const file = new File([blob], safeName, { type: blob.type });
            console.log('[Paste media] file:', {
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
            });
            return onMediaUpload(file).then((insertUrl) => ({
              insertUrl,
              isVideo,
              dataFilename: safeName,
            }));
          }),
      ),
    )
      .then((results) => {
        results.forEach(({ insertUrl, isVideo, dataFilename }) => {
          editorRef.current
            ?.chain()
            .focus()
            .insertContent(
              isVideo
                ? {
                    type: 'video',
                    attrs: {
                      src: insertUrl,
                      controls: true,
                      ...(dataFilename && { dataFilename }),
                    },
                  }
                : {
                    type: 'image',
                    attrs: {
                      src: insertUrl,
                      ...(dataFilename && { dataFilename }),
                    },
                  },
            )
            .run();
        });
      })
      .catch((err) => {
        console.error('Paste (HTML blob) failed:', err);
        alert(err instanceof Error ? err.message : '업로드 실패');
      });
    return true;
  };
}
