import { MediaItem } from '@/types/api/postDetail';

const PLACEHOLDER_PATTERN = /^\{\{IMG_\d+\}\}$/;

/** 문서 내 blob URL을 가진 요소를 등장 순서(img → video/source)대로 반환 */
function getBlobUrlEntriesInOrder(
  doc: Document,
): { element: Element; src: string }[] {
  const entries: { element: Element; src: string }[] = [];
  doc.querySelectorAll('img, video, source').forEach((media) => {
    const src = media.getAttribute('src');
    if (src?.startsWith('blob:')) entries.push({ element: media, src });
  });
  return entries;
}

/** HTML 한 번 파싱해 blob URL 목록 + 미디어 개수 반환 (이중 파싱 방지) */
export function getContentMediaInfo(html: string): {
  blobUrls: string[];
  mediaCount: number;
} {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const blobUrls = getBlobUrlEntriesInOrder(doc).map((e) => e.src);
  const mediaCount = doc.querySelectorAll('img, video').length;
  return { blobUrls, mediaCount };
}

export function getBlobUrlsInHtml(html: string): string[] {
  return getContentMediaInfo(html).blobUrls;
}

/** content 내 이미지+비디오 개수 (blob/서버 URL 구분 없이 노드 개수) */
export function getMediaCountInContent(html: string): number {
  return getContentMediaInfo(html).mediaCount;
}

/** placeholder 치환 시 제외할 속성 (붙여넣기로 들어온 이미 서버 URL인 미디어용) */
const SKIP_PLACEHOLDER_ATTR = 'data-skip-placeholder';

// 모든 미디어 src를 placeholder로 치환. data-skip-placeholder 있으면 제외 (이미 DB URL인 복붙 미디어)
export function replaceImagesWithPlaceholders(html: string): string {
  const { mediaTags, doc } = collectMediaTagsFromHtml(html);
  console.log('mediaTags=========', mediaTags);
  const withoutPastedMedia = Array.from(mediaTags).filter(
    (element) => !element.hasAttribute(SKIP_PLACEHOLDER_ATTR),
  );
  console.log('withoutPastedMedia============', withoutPastedMedia);
  withoutPastedMedia.forEach((element, i) => {
    if (element instanceof HTMLElement)
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

  mediaList.forEach((media, index) => {
    if (media?.url == null) return;
    const placeholder = `{{IMG_${index}}}`;
    const regex = new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g');
    processedContent = processedContent.replace(regex, media.url);
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

// (수정 모드) 모든 미디어 태그에 data-media-id 속성 추가 (mediaList[i] 없으면 스킵)
export function addDataAttMediaIdToImages(
  html: string,
  mediaList: MediaItem[],
): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('img, video').forEach((element, i) => {
    const media = mediaList[i];
    if (media?.mediaId) element.setAttribute('data-media-id', media.mediaId);
  });
  return doc.body.innerHTML;
}

/** HTML 파싱 후 미디어 태그별 index, mediaId, src 반환 (한 번만 파싱) */
function getMediaTagInfos(
  html: string,
): { index: number; mediaId: string | null; src: string | null }[] {
  const { mediaTags } = collectMediaTagsFromHtml(html);
  return Array.from(mediaTags).map((el, index) => ({
    index,
    mediaId: el.getAttribute('data-media-id'),
    src: el.getAttribute('src'),
  }));
}

/** blob 또는 placeholder({{IMG_N}})면 새 미디어로 간주 */
function isNewMediaSrc(src: string | null): boolean {
  if (!src) return false;
  return src.startsWith('blob:') || PLACEHOLDER_PATTERN.test(src);
}

// (수정 모드) mediaId가 있는 태그들의 mediaId와 order 수집
export function collectMediaIdsAndOrdersFromHtml(
  html: string,
): { mediaId: string | null; order: number }[] {
  const mediaTagInfos = getMediaTagInfos(html).map(({ mediaId, index }) => ({
    mediaId,
    order: index,
  }));
  return mediaTagInfos;
}

// (수정 모드) data-media-id 없고 blob/placeholder인 태그의 order 수집 (에디터 내 복붙 제외)
export function collectNewMediaOrdersFromHtml(html: string): number[] {
  return getMediaTagInfos(html)
    .filter((info) => !info.mediaId && isNewMediaSrc(info.src))
    .map((info) => info.index);
}

// (수정 모드) editor.view.dom 내 mediaId가 있는 태그들의 mediaId와 order 수집
export function collectMediaIdsAndOrdersFromEditorDom(
  editorDom: Document | Element,
): { mediaId: string; order: number }[] {
  const mediaTags = editorDom.querySelectorAll('img, video');
  const result: { mediaId: string; order: number }[] = [];
  mediaTags.forEach((element, index) => {
    const mediaId = element.getAttribute('data-media-id');
    if (mediaId) result.push({ mediaId, order: index });
  });
  return result;
}

// (수정 모드) blob URL 보유 여부 상관없이, html 내 모든 미디어 태그 수집
export function collectMediaTagsFromHtml(html: string): {
  mediaTags: NodeListOf<Element>;
  doc: Document;
} {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const mediaTags = doc.querySelectorAll('img, video');
  return { mediaTags, doc };
}
