import { useCallback, useRef } from "react";
import { MAX_FILE_SIZE } from "@/lib/tiptap-utils";

export function usePostImageManager() {
  const imageFilesMap = useRef(new Map<string, File>());

  const handleImageUpload = useCallback(async (
    file: File,
    onProgress?: (event: { progress: number }) => void,
    abortSignal?: AbortSignal
  ): Promise<string> => {
    // 파일 검증
    if (!file) {
      throw new Error("No file provided");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `File size exceeds maximum allowed (${MAX_FILE_SIZE / (1024 * 1024)}MB)`
      );
    }

    // 진행률 시뮬레이션
    for (let progress = 0; progress <= 100; progress += 20) {
      if (abortSignal?.aborted) {
        throw new Error("Upload cancelled");
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
      onProgress?.({ progress });
    }

    const blobUrl = URL.createObjectURL(file);
    imageFilesMap.current.set(blobUrl, file);
    return blobUrl;
  }, []);

  const getImageFiles = useCallback(() => {
    return Array.from(imageFilesMap.current.values());
  }, []);

  const clearImages = useCallback(() => {
    imageFilesMap.current.clear();
  }, []);

  return { handleImageUpload, getImageFiles, clearImages };
}
