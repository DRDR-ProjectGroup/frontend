'use client';

import { useEffect, useRef, useState } from 'react';
import {
  EditorContent,
  EditorContext,
  useEditor,
  type Editor,
} from '@tiptap/react';

// --- Tiptap Core Extensions ---
import { StarterKit } from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Highlight } from '@tiptap/extension-highlight';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Selection } from '@tiptap/extensions';
import Youtube from '@tiptap/extension-youtube';
import FileHandler from '@tiptap/extension-file-handler';

// --- UI Primitives ---
import { Button } from '@/components/tiptap/tiptap-ui-primitive/button';
import { Spacer } from '@/components/tiptap/tiptap-ui-primitive/spacer';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/tiptap/tiptap-ui-primitive/toolbar';

// --- Tiptap Node ---
import { ImageUploadNode } from '@/components/tiptap/tiptap-node/image-upload-node/image-upload-node-extension';
import { VideoUploadNode } from '@/components/tiptap/tiptap-node/video-upload-node/video-upload-node-extension';
import { Video } from '@/components/tiptap/tiptap-node/video-node/video-extension';
import { HorizontalRule } from '@/components/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension';
import '@/components/tiptap/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/components/tiptap/tiptap-node/code-block-node/code-block-node.scss';
import '@/components/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss';
import '@/components/tiptap/tiptap-node/list-node/list-node.scss';
import '@/components/tiptap/tiptap-node/image-node/image-node.scss';
import '@/components/tiptap/tiptap-node/video-node/video-node.scss';
import '@/components/tiptap/tiptap-node/heading-node/heading-node.scss';
import '@/components/tiptap/tiptap-node/paragraph-node/paragraph-node.scss';

// --- Tiptap UI ---
import { HeadingDropdownMenu } from '@/components/tiptap/tiptap-ui/heading-dropdown-menu';
import { ImageUploadButton } from '@/components/tiptap/tiptap-ui/image-upload-button';
import { VideoUploadButton } from '@/components/tiptap/tiptap-ui/video-upload-button';
import { YoutubeButton } from '@/components/tiptap/tiptap-ui/youtube-button';
import { ListDropdownMenu } from '@/components/tiptap/tiptap-ui/list-dropdown-menu';
import { BlockquoteButton } from '@/components/tiptap/tiptap-ui/blockquote-button';
import { CodeBlockButton } from '@/components/tiptap/tiptap-ui/code-block-button';
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from '@/components/tiptap/tiptap-ui/color-highlight-popover';
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from '@/components/tiptap/tiptap-ui/link-popover';
import { MarkButton } from '@/components/tiptap/tiptap-ui/mark-button';
import { TextAlignButton } from '@/components/tiptap/tiptap-ui/text-align-button';
import { UndoRedoButton } from '@/components/tiptap/tiptap-ui/undo-redo-button';

// --- Icons ---
import { ArrowLeftIcon } from '@/components/tiptap/tiptap-icons/arrow-left-icon';
import { HighlighterIcon } from '@/components/tiptap/tiptap-icons/highlighter-icon';
import { LinkIcon } from '@/components/tiptap/tiptap-icons/link-icon';

// --- Hooks ---
import { useIsBreakpoint } from '@/hooks/use-is-breakpoint';
import { useWindowSize } from '@/hooks/use-window-size';
import { useCursorVisibility } from '@/hooks/use-cursor-visibility';

// --- Components ---

// --- Lib ---
import { MAX_FILE_SIZE } from '@/lib/tiptap-utils';

// --- Styles ---
import '@/components/tiptap/tiptap-templates/simple/simple-editor.scss';

// --- Types ---
type MediaUploadHandler = (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal,
) => Promise<string>;

/** MIME 타입 → 파일 확장자 (이미지/비디오 다양하게) */
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

function getExtensionFromMime(mime: string, isVideo: boolean): string {
  const lower = mime.toLowerCase();
  if (MIME_TO_EXT[lower]) return MIME_TO_EXT[lower];
  const part = lower.split('/')[1];
  if (part && /^[a-z0-9+-]+$/i.test(part)) return part;
  return isVideo ? 'mp4' : 'png';
}

/** HTML에서 blob URL만 추출. img/video 태그 순서대로, 이미지/비디오 구분 */
function extractBlobMediaFromHtml(
  html: string,
): { url: string; isVideo: boolean }[] {
  const list: { url: string; isVideo: boolean }[] = [];
  const re = /<(video|img)[^>]+src=["'](blob:[^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    list.push({ url: m[2], isVideo: m[1].toLowerCase() === 'video' });
  }
  return list;
}

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={['bulletList', 'orderedList', 'taskList']}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Image" />
        <VideoUploadButton text="Video" />
        <YoutubeButton text="YouTube" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: 'highlighter' | 'link';
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor({
  onEditorReady,
  onMediaUpload,
  countMediaInHtml,
  onPasteComplete,
}: {
  onEditorReady: (editor: Editor) => void;
  onMediaUpload: MediaUploadHandler;
  /** HTML 문자열 내 미디어 개수 (제한·붙여넣기 후 로그용) */
  countMediaInHtml?: (html: string) => number;
  /** blob 없는 붙여넣기(서버 URL 등) 후 호출 - 합산 개수 로그용 */
  onPasteComplete?: () => void;
}) {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>(
    'main',
  );
  const toolbarRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor',
      },
      handleDOMEvents: {
        paste: (_view, ev) => {
          const e = ev as ClipboardEvent;
          const data = e.clipboardData;
          if (!data) return false;

          const filesLength = data.files?.length ?? 0;
          if (filesLength > 0) return false; // FileHandler가 처리

          const html = data.getData('text/html');
          const blobMedia = extractBlobMediaFromHtml(html);

          if (blobMedia.length === 0) {
            const pastedCount = countMediaInHtml?.(html) ?? 0;
            const currentCount =
              countMediaInHtml?.(editorRef.current?.getHTML() ?? '') ?? 0;
            if (pastedCount > 0 && currentCount + pastedCount > 5) {
              e.preventDefault();
              e.stopPropagation();
              alert('최대 5개의 파일만 업로드할 수 있습니다.');
              return true;
            }
            if (pastedCount > 0 && onPasteComplete) {
              // 에디터의 DOM 업데이트가 완료된 후 상위 컴포넌트에 알리기 위해 setTimeout 사용
              setTimeout(() => onPasteComplete(), 0);
            }
            return false;
          }

          e.preventDefault();
          e.stopPropagation();

          Promise.all(
            blobMedia.map(({ url, isVideo }) =>
              fetch(url)
                .then((res) => res.blob())
                .then((blob) => {
                  const ext = getExtensionFromMime(blob.type, isVideo);
                  const typeLabel = isVideo ? '비디오' : '이미지';
                  console.log('[붙여넣기]', {
                    타입: typeLabel,
                    MIME: blob.type,
                    확장자: ext,
                  });
                  const file = new File(
                    [blob],
                    `pasted-${isVideo ? 'video' : 'image'}.${ext}`,
                    { type: blob.type },
                  );
                  return onMediaUpload(file).then((insertUrl) => ({
                    insertUrl,
                    isVideo,
                  }));
                }),
            ),
          )
            .then((results) => {
              results.forEach(({ insertUrl, isVideo }) => {
                editorRef.current
                  ?.chain()
                  .focus()
                  .insertContent(
                    isVideo
                      ? {
                          type: 'video',
                          attrs: { src: insertUrl, controls: true },
                        }
                      : { type: 'image', attrs: { src: insertUrl } },
                  )
                  .run();
              });
            })
            .catch((err) => {
              console.error('Paste (HTML blob) failed:', err);
              alert(err instanceof Error ? err.message : '업로드 실패');
            });
          return true;
        },
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Video,
      Typography,
      Superscript,
      Subscript,
      Selection,
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/gif',
          'image/webp',
          'video/mp4',
          'video/webm',
          'video/quicktime',
        ],
        onPaste: (currentEditor, files) => {
          Promise.all(
            files.map((file) => {
              const isVideo = file.type.startsWith('video/');
              return onMediaUpload(file).then((url) => {
                currentEditor
                  .chain()
                  .focus()
                  .insertContent(
                    isVideo
                      ? { type: 'video', attrs: { src: url, controls: true } }
                      : { type: 'image', attrs: { src: url } },
                  )
                  .run();
              });
            }),
          ).catch((err) => {
            console.error('Paste upload failed:', err);
            alert(err instanceof Error ? err.message : '업로드 실패');
          });
        },
        onDrop: (currentEditor, files, pos) => {
          Promise.all(
            files.map((file) => {
              const isVideo = file.type.startsWith('video/');
              return onMediaUpload(file).then((url) => ({
                type: isVideo ? 'video' : 'image',
                attrs: isVideo ? { src: url, controls: true } : { src: url },
              }));
            }),
          )
            .then((nodes) => {
              currentEditor.chain().focus().insertContentAt(pos, nodes).run();
            })
            .catch((err) => {
              console.error('Drop upload failed:', err);
              alert(err instanceof Error ? err.message : '업로드 실패');
            });
        },
      }),
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 5,
        upload: onMediaUpload,
        onError: (error) => {
          console.error('Upload failed:', error);
          alert(error.message);
        },
      }),
      VideoUploadNode.configure({
        accept: 'video/*',
        maxSize: MAX_FILE_SIZE,
        limit: 5,
        type: 'video',
        upload: onMediaUpload,
        onError: (error) => {
          console.error('Upload failed:', error);
          alert(error.message);
        },
      }),
    ],
    content: '<div></div>',
  });

  editorRef.current = editor;

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main');
    }
  }, [isMobile, mobileView]);

  useEffect(() => {
    if (editor) {
      onEditorReady?.(editor);
    }
  }, [editor, onEditorReady]);

  return (
    <div className="simple-editor-wrapper tiptap-editor">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === 'main' ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView('highlighter')}
              onLinkClick={() => setMobileView('link')}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
              onBack={() => setMobileView('main')}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
