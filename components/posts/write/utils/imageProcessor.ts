import { MediaItem } from '@/types/api/postDetail';

// HTML에서 blob URL을 placeholder로 변환
export function replaceImagesWithPlaceholders(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll('img');
  
  let blobIndex = 0; // blob 이미지만 카운트
  images.forEach((img) => {
    const src = img.getAttribute('src');
    if (src?.startsWith('blob:')) {
      img.setAttribute('src', `{{IMG_${blobIndex}}}`);
      blobIndex++;
    }
  });
  
  return doc.body.innerHTML;
}

// placeholder를 실제 이미지 URL로 교체
export function replacePlaceholdersWithUrls(content: string, mediaList: MediaItem[]): string {
  let processedContent = content;

  mediaList.forEach((media) => {
    const placeholder = `{{IMG_${media.order}}}`;
    processedContent = processedContent.replace(
      placeholder,
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL + media.url,
    );
  });

  return processedContent;
}
