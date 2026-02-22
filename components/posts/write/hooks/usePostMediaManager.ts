import { useCallback, useRef } from 'react';
import { MAX_FILE_SIZE } from '@/lib/tiptap-utils';
import { getBlobUrlsInHtml } from '../utils/imageProcessor';

type UsePostMediaManagerOptions = {
  /** 에디터 content에 있는 blob URL 목록을 반환하는 함수. 있으면 업로드 전에 map을 이 목록과 동기화한다. */
  getBlobUrlsInContent?: () => string[];
};

export function usePostMediaManager(options?: UsePostMediaManagerOptions) {
  const mediaFilesMap = useRef(new Map<string, File>());
  const getBlobUrlsInContent = options?.getBlobUrlsInContent;

  const handleMediaUpload = useCallback(
    async (
      file: File,
      onProgress?: (event: { progress: number }) => void,
      abortSignal?: AbortSignal,
    ): Promise<string> => {
      if (!file) {
        throw new Error('No file provided');
      }

      // 에디터에서 삭제된 미디어는 map에서 제거 (개수 제한이 실제 노출 개수 기준이 되도록)
      if (getBlobUrlsInContent) {
        const urlsInContent = new Set(getBlobUrlsInContent());
        for (const url of mediaFilesMap.current.keys()) {
          if (!urlsInContent.has(url)) mediaFilesMap.current.delete(url);
        }
      }

      // 전체 파일 개수 체크 (이미지 + 비디오 합쳐서 5개 제한)
      const currentFileCount = mediaFilesMap.current.size;
      if (currentFileCount >= 5) {
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
      return blobUrl;
    },
    [getBlobUrlsInContent],
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
    // 하위 호환성을 위한 별칭
    handleImageUpload: handleMediaUpload,
    getImageFiles: getMediaFiles,
    clearImages: clearMedia,
  };
}
