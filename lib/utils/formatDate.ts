export function formatDate(date: string) {
  const dateObj = new Date(date);
  const today = new Date();
  
  const isSameDay = dateObj.toDateString() === today.toDateString();
  
  if (isSameDay) {
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } 
  else {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
}