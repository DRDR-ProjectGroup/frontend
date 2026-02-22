import { MediaItem } from '@/types/api/postDetail';

/** 문서 내 blob URL을 가진 요소를 등장 순서(img → video/source)대로 반환 */
function getBlobUrlEntriesInOrder(doc: Document): { element: Element; src: string }[] {
  const entries: { element: Element; src: string }[] = [];
  doc.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (src?.startsWith('blob:')) entries.push({ element: img, src });
  });
  doc.querySelectorAll('video').forEach((video) => {
    const src = video.getAttribute('src');
    if (src?.startsWith('blob:')) {
      entries.push({ element: video, src });
    } else {
      video.querySelectorAll('source').forEach((source) => {
        const src = source.getAttribute('src');
        if (src?.startsWith('blob:')) entries.push({ element: source, src });
      });
    }
  });
  return entries;
}

export function getBlobUrlsInHtml(html: string): string[] {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return getBlobUrlEntriesInOrder(doc).map((e) => e.src);
}

export function replaceImagesWithPlaceholders(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  getBlobUrlEntriesInOrder(doc).forEach(({ element }, i) => {
    element.setAttribute('src', `{{IMG_${i}}}`);
  });
  return doc.body.innerHTML;
}

// placeholder를 실제 이미지 URL로 교체
export function replacePlaceholdersWithUrls(
  content: string,
  mediaList: MediaItem[],
): string {
  let processedContent = content;

  mediaList.forEach((media) => {
    const placeholder = `{{IMG_${media.order}}}`;
    // 정규식을 사용하여 모든 일치 항목을 교체 (전역 플래그 'g' 사용)
    const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
    processedContent = processedContent.replace(
      regex,
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + media.url, // 백엔드 로컬컬 서버 URL
      // media.url, // S3 저장소 URL
    );
  });

  // 교체되지 않은 placeholder가 남아있는지 확인하고 경고
  const remainingPlaceholders = processedContent.match(/\{\{IMG_\d+\}\}/g);
  if (remainingPlaceholders && process.env.NODE_ENV === 'development') {
    console.warn(
      '교체되지 않은 placeholder가 있습니다:',
      remainingPlaceholders,
      '\nmediaList:',
      mediaList,
    );
  }

  return processedContent;
}
