import { Node, mergeAttributes } from '@tiptap/core';

export interface VideoOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string }) => ReturnType;
    };
  }
}

export const Video = Node.create<VideoOptions>({
  name: 'video',

  group: 'block',

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
      // 처음 수정되는 대상에 data-media-id 추가 -> new 미디어와 구분짓기 위함
      dataMediaId: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-media-id'),
        renderHTML: (attributes) =>
          attributes.dataMediaId
            ? { 'data-media-id': attributes.dataMediaId }
            : {},
      },
      // replaceVideosWithPlaceholders에서 이 속성을 보고 치환 제외하기 위함
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

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'video',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export default Video;
