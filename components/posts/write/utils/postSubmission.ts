import { replaceImagesWithPlaceholders } from './imageProcessor';
import { buildEditMediaPayload } from './mediaDiff';

type PostMode = 'create' | 'edit';

type BuildPostPayloadParams = {
  mode: PostMode;
  title: string;
  initialContent?: string;
  currentHtml: string;
};

export function buildPostPayload({
  mode,
  title,
  initialContent = '',
  currentHtml,
}: BuildPostPayloadParams) {
  const processedHtml = replaceImagesWithPlaceholders(currentHtml);

  const basePayload = {
    title,
    content: processedHtml,
  };

  if (mode === 'create') {
    return basePayload;
  }

  const mediaPayload = buildEditMediaPayload(initialContent, currentHtml);
  return {
    ...basePayload,
    ...mediaPayload,
  };
}

export function buildPostFormData(postPayload: object, files: File[]) {
  const formData = new FormData();

  formData.append(
    'post',
    new Blob([JSON.stringify(postPayload)], {
      type: 'application/json',
    }),
  );

  files.forEach((file) => formData.append('files', file));
  return formData;
}
