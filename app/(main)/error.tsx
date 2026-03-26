'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="py-20 text-center">
      <p>게시글을 불러오는 중 오류가 발생했습니다.</p>
      <button onClick={() => reset()} className="mt-4">
        다시 시도
      </button>
    </div>
  );
}
