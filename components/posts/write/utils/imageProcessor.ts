import { MediaItem } from '@/types/api/postDetail';

// HTML에서 blob URL을 placeholder로 변환
export function replaceImagesWithPlaceholders(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  let blobIndex = 0;

  // img 태그 처리
  const images = doc.querySelectorAll('img');
  images.forEach((img) => {
    const src = img.getAttribute('src');
    if (src?.startsWith('blob:')) {
      img.setAttribute('src', `{{IMG_${blobIndex}}}`);
      blobIndex++;
    }
  });

  // video 태그 처리
  const videos = doc.querySelectorAll('video');
  videos.forEach((video) => {
    const src = video.getAttribute('src');
    if (src?.startsWith('blob:')) {
      video.setAttribute('src', `{{IMG_${blobIndex}}}`);
      blobIndex++;
    } else {
      // source 태그도 확인
      const sources = video.querySelectorAll('source');
      sources.forEach((source) => {
        const sourceSrc = source.getAttribute('src');
        if (sourceSrc?.startsWith('blob:')) {
          source.setAttribute('src', `{{IMG_${blobIndex}}}`);
          blobIndex++;
        }
      });
    }
  });

  // iframe 태그는 blob이 아니므로 placeholder 처리 불필요 (YouTube 등)

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
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + media.url,
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
