import Button from '../ui/Button';

/**
 * 페이지네이션 컴포넌트의 Props 타입
 */
export type PaginationProps = {
  /** 현재 페이지 번호 (1부터 시작) */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 시 호출되는 콜백 함수 */
  onPageChange: (page: number) => void;
  /** 최대로 표시할 페이지 번호 개수 (기본값: 5) */
  maxVisiblePages?: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 비활성화 여부 (로딩 중일 때 사용) */
  disabled?: boolean;
  /** ellipsis(...) 사용 여부 - 페이지가 많을 때 생략 표시 (기본값: false) */
  showEllipsis?: boolean;
  /** 페이지가 1개 이하일 때 컴포넌트를 숨길지 여부 (기본값: false) */
  hideOnSinglePage?: boolean;
};

/**
 * 숫자를 min과 max 사이로 제한하는 유틸리티 함수
 * @example clamp(10, 1, 5) => 5 (max로 제한)
 * @example clamp(-1, 1, 5) => 1 (min으로 제한)
 * @example clamp(3, 1, 5) => 3 (범위 내)
 */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * 페이지네이션 컴포넌트
 *
 * 기능:
 * - 이전/다음 페이지 이동
 * - 직접 페이지 번호 클릭
 * - 페이지 수가 많을 때 ellipsis(...) 표시 (옵션)
 * - 현재 페이지 강조 표시
 * - 안전한 페이지 범위 제한
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className,
  disabled = false,
  showEllipsis = false,
  hideOnSinglePage = false,
}: PaginationProps) {
  // 안전성 체크: totalPages는 최소 1, currentPage는 1~totalPages 범위 내로 제한
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrent = clamp(currentPage, 1, safeTotalPages);

  // 페이지가 1개 이하면 숨기기 (옵션)
  if (hideOnSinglePage && safeTotalPages <= 1) return null;

  /**
   * 표시할 페이지 번호 배열 생성 (ellipsis 사용 시)
   * 예시 (totalPages=10, currentPage=5):
   * - [1, '...', 4, 5, 6, '...', 10]
   */
  const getPageNumbersWithEllipsis = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    // 총 페이지가 maxVisiblePages 이하면 모두 표시
    if (safeTotalPages <= maxVisiblePages) {
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // 페이지가 많을 때: 첫 페이지, 중간 범위, 마지막 페이지 표시
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // 시작 부분에 있을 때 (예: 현재 페이지가 1, 2, 3)
    if (safeCurrent <= halfVisible + 1) {
      // 1, 2, 3, 4, ..., 10
      for (let i = 1; i <= maxVisiblePages - 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(safeTotalPages);
    }
    // 끝 부분에 있을 때 (예: 현재 페이지가 8, 9, 10)
    else if (safeCurrent >= safeTotalPages - halfVisible) {
      // 1, ..., 7, 8, 9, 10
      pages.push(1);
      pages.push('...');
      for (
        let i = safeTotalPages - (maxVisiblePages - 2);
        i <= safeTotalPages;
        i++
      ) {
        pages.push(i);
      }
    }
    // 중간 부분에 있을 때 (예: 현재 페이지가 5)
    else {
      // 1, ..., 4, 5, 6, ..., 10
      pages.push(1);
      pages.push('...');
      for (let i = safeCurrent - 1; i <= safeCurrent + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(safeTotalPages);
    }

    return pages;
  };

  /**
   * 표시할 페이지 번호 배열 생성 (ellipsis 미사용 시)
   * 예시 (totalPages=10, currentPage=5, maxVisiblePages=5):
   * - [3, 4, 5, 6, 7] (현재 페이지 중심으로 5개)
   */
  const getPageNumbersSimple = (): number[] => {
    // 현재 페이지를 중심으로 시작/끝 페이지 계산
    const startPage = Math.max(
      1,
      safeCurrent - Math.floor(maxVisiblePages / 2),
    );
    const endPage = Math.min(safeTotalPages, startPage + maxVisiblePages - 1);

    // 끝 부분에서 시작 페이지 재조정 (항상 maxVisiblePages 개수 유지)
    const adjustedStart = Math.max(1, endPage - maxVisiblePages + 1);

    const pages: number[] = [];
    for (let p = adjustedStart; p <= endPage; p++) {
      pages.push(p);
    }
    return pages;
  };

  // ellipsis 사용 여부에 따라 페이지 배열 선택
  const pageNumbers = showEllipsis
    ? getPageNumbersWithEllipsis()
    : getPageNumbersSimple();

  return (
    <div
      className={`flex items-center justify-center gap-1 ${className ?? ''}`}
    >
      {/* 이전 버튼 - 첫 페이지에서는 비활성화 */}
      <Button
        variant="tertiary"
        className="border-none"
        disabled={disabled || safeCurrent <= 1}
        onClick={() => onPageChange(safeCurrent - 1)}
      >
        이전
      </Button>

      {/* 페이지 번호 버튼들 */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            // ellipsis - 클릭 불가능한 텍스트
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-primitive-grayPrimary"
            >
              ...
            </span>
          ) : (
            // 페이지 번호 버튼
            <Button
              size="sm"
              key={page}
              // 현재 페이지는 primary 색상으로 강조, 나머지는 tertiary
              variant={page === safeCurrent ? 'primary' : 'tertiary'}
              className={
                page === safeCurrent
                  ? 'min-w-[36px]'
                  : 'border-none min-w-[36px]'
              }
              disabled={disabled}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </Button>
          ),
        )}
      </div>

      {/* 다음 버튼 - 마지막 페이지에서는 비활성화 */}
      <Button
        size="sm"
        variant="tertiary"
        className="border-none"
        disabled={disabled || safeCurrent >= safeTotalPages}
        onClick={() => onPageChange(safeCurrent + 1)}
      >
        다음
      </Button>
    </div>
  );
}
