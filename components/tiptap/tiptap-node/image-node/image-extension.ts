import { Image as BaseImage } from '@tiptap/extension-image';

/**
 * Image 노드에 data-media-id 속성 추가.
 * 글 수정 시 기존 미디어 유지/삭제 diff용으로 사용.
 */
export const Image = BaseImage.extend({
  addAttributes() {
    return {
      ...this.parent?.() ?? {},
      dataMediaId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-media-id'),
        renderHTML: (attributes) =>
          attributes.dataMediaId
            ? { 'data-media-id': attributes.dataMediaId }
            : {},
      },
    };
  },
});

export default Image;
