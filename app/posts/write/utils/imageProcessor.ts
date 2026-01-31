// HTML에서 blob URL을 placeholder로 변환
export function replaceImagesWithPlaceholders(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.querySelectorAll('img');
  
  images.forEach((img, index) => {
    const src = img.getAttribute('src');
    if (src?.startsWith('blob:')) {
      img.setAttribute('src', `{{IMG_${index}}}`);
    }
  })
  
  return doc.body.innerHTML;
}