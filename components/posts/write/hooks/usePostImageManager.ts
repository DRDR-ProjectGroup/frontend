import { useCallback, useRef } from 'react';
import { MAX_FILE_SIZE } from '@/lib/tiptap-utils';

export function usePostMediaManager() {
  const mediaFilesMap = useRef(new Map<string, File>());

  const handleMediaUpload = useCallback(
    async (
      file: File,
      onProgress?: (event: { progress: number }) => void,
      abortSignal?: AbortSignal,
    ): Promise<string> => {
      if (!file) {
        throw new Error('No file provided');
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
    [],
  );

  const getMediaFiles = useCallback(() => {
    return Array.from(mediaFilesMap.current.values());
  }, []);

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
