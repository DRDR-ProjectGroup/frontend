export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* 페이지 제목 */}
      <div className="h-7 w-20 bg-gray-200 rounded mb-6" />

      <div className="space-y-4">
        {/* 카테고리 선택 */}
        <div className="h-10 w-40 bg-gray-200 rounded" />

        {/* 제목 입력 */}
        <div className="h-10 w-full bg-gray-200 rounded" />

        {/* 에디터 */}
        <div className="h-96 w-full bg-gray-200 rounded" />

        {/* 제출 버튼 */}
        <div className="flex justify-center">
          <div className="h-10 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
