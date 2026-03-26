export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* 카테고리 태그 */}
      <div className="py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
        </div>

        {/* 제목 */}
        <div className="h-7 w-3/4 bg-gray-200 rounded mb-4" />

        {/* 작성자 / 날짜 / 조회수 */}
        <div className="flex items-center gap-2 mt-4">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-1 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-1 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      {/* 본문 */}
      <div className="py-8 border-t border-b border-gray-100 space-y-3">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-100 w-full bg-gray-200 rounded" />
      </div>

      {/* 좋아요/싫어요 */}
      <div className="flex justify-center gap-4 py-6">
        <div className="h-10 w-20 bg-gray-200 rounded-full" />
        <div className="h-10 w-20 bg-gray-200 rounded-full" />
      </div>

      {/* 댓글 */}
      <div className="mt-4 space-y-4">
        <div className="h-5 w-20 bg-gray-200 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3 py-3 border-b border-gray-100">
            <div className="h-8 w-8 bg-gray-200 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
