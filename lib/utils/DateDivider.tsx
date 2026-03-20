export function DateDivider({ timestamp }: { timestamp: string }) {
  const date = new Date(timestamp);

  const formatted = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;

  return (
    <div className="flex justify-center my-2">
      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        {formatted}
      </span>
    </div>
  );
}
