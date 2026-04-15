export type ImageDimensions = {
  width: number;
  height: number;
};

function isFiniteDimension(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

export function getImageDimensions(file: File): Promise<ImageDimensions | null> {
  if (!file.type.startsWith('image/')) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      URL.revokeObjectURL(objectUrl);

      if (isFiniteDimension(width) && isFiniteDimension(height)) {
        resolve({ width, height });
        return;
      }

      resolve(null);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };

    img.src = objectUrl;
  });
}
