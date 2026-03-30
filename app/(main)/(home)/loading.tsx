export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-28 bg-gray-200 rounded" />
      </div>

      {/* 게시글 아이템 */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-4 border-b border-gray-100">
          <div className="h-5 bg-gray-200 rounded mb-2" />
          <div className="flex gap-3">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-8 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
