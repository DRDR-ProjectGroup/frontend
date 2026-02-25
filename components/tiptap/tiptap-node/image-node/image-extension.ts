import { Image as BaseImage } from '@tiptap/extension-image';

/**
 * Image 노드에 data-media-id 속성 추가.
 * 글 수정 시 기존 미디어 유지/삭제 diff용으로 사용.
 */
export const Image = BaseImage.extend({
  addAttributes() {
    return {
      ...(this.parent?.() ?? {}),
      // 처음 수정되는 대상에 data-media-id 추가 -> new 미디어와 구분짓기 위함
      dataMediaId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-media-id'),
        renderHTML: (attributes) =>
          attributes.dataMediaId
            ? { 'data-media-id': attributes.dataMediaId }
            : {},
      },
      // replaceImagesWithPlaceholders에서 이 속성을 보고 치환 제외하기 위함
      dataSkipPlaceholder: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-skip-placeholder'),
        renderHTML: (attributes) =>
          attributes.dataSkipPlaceholder
            ? { 'data-skip-placeholder': attributes.dataSkipPlaceholder }
            : {},
      },
    };
  },
});

export default Image;
