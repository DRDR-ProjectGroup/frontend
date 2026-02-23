import { useCallback, useRef } from 'react';
import { MAX_FILE_SIZE } from '@/lib/tiptap-utils';
import {
  getBlobUrlsInHtml,
  getContentMediaInfo,
} from '../utils/imageProcessor';

type UsePostMediaManagerOptions = {
  /** 에디터 HTML 반환. 있으면 content 기준으로 map 동기화·개수 제한·로그. */
  getEditorHtml?: () => string;
};

export function usePostMediaManager(options?: UsePostMediaManagerOptions) {
  const mediaFilesMap = useRef(new Map<string, File>());
  const getEditorHtml = options?.getEditorHtml;

  const handleMediaUpload = useCallback(
    async (
      file: File,
      onProgress?: (event: { progress: number }) => void,
      abortSignal?: AbortSignal,
    ): Promise<string> => {
      if (!file) {
        throw new Error('No file provided');
      }

      const html = getEditorHtml?.() ?? '';
      const { blobUrls: urlsInContent, mediaCount: currentMediaCount } =
        getEditorHtml ? getContentMediaInfo(html) : { blobUrls: [] as string[], mediaCount: mediaFilesMap.current.size };

      // 에디터에서 삭제된 미디어는 map에서 제거
      if (getEditorHtml) {
        const urlSet = new Set(urlsInContent);
        for (const url of mediaFilesMap.current.keys()) {
          if (!urlSet.has(url)) mediaFilesMap.current.delete(url);
        }
      }

      // 전체 미디어 개수 체크 (content 기준 5개 제한)
      if (currentMediaCount >= 5) {
        throw new Error('최대 5개의 파일만 업로드할 수 있습니다.');
      }

      if (file.size > MAX_FILE_SIZE) {
        throw new Error(
          `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`,
        );
      }

      for (let progress = 0; progress <= 100; progress += 20) {
        if (abortSignal?.aborted) {
          throw new Error('Upload cancelled');
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
        onProgress?.({ progress });
      }

      const blobUrl = URL.createObjectURL(file);
      mediaFilesMap.current.set(blobUrl, file);

      const files = Array.from(mediaFilesMap.current.values());
      const totalCount = getEditorHtml ? currentMediaCount + 1 : files.length;
      const list = files.map((f, i) => ({
        order: i,
        name: f.name,
        type: f.type,
        size: f.size,
      }));
      console.log('[미디어 업로드] 전체 미디어 개수:', totalCount);
      console.log('[미디어 업로드] 전체 파일 정보:', list);

      return blobUrl;
    },
    [getEditorHtml],
  );

  const getMediaFiles = useCallback(
    (html?: string) => {
      if (html) {
        const urlsInOrder = getBlobUrlsInHtml(html);
        return urlsInOrder
          .map((url) => mediaFilesMap.current.get(url))
          .filter((f): f is File => Boolean(f));
      }
      return Array.from(mediaFilesMap.current.values());
    },
    [],
  );

  const clearMedia = useCallback(() => {
    mediaFilesMap.current.clear();
  }, []);

  return {
    handleMediaUpload,
    getMediaFiles,
    clearMedia,
  };
}
