export function formatTimeMsToHHMMSS(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m} : ${s.toString().padStart(2, '0')}`;
}

export function formatTimeStampToHHMM(timestamp: string) {
  const date = new Date(timestamp);
  const today = new Date();

  const isToday = date.toDateString() === today.toDateString();

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (isToday) {
    return `${hours}:${minutes}`;
  }

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
