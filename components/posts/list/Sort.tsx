import Button from '@/components/ui/Button';
import { PostListParams, PostListSortType } from '@/types/api/postList';
import { RiFireLine } from 'react-icons/ri';
import { BiTime } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

interface SortProps extends PostListParams {
  searchMode: boolean;
  currentPostId?: number;
}

export default function Sort({
  searchMode,
  currentPostId,
  category,
  searchTarget,
  searchKeyword,
  page,
  sort,
}: SortProps) {
  const router = useRouter();

  const sortOptions = [
    { value: 'LATEST' as const, label: '최신순' },
    { value: 'POPULAR' as const, label: '인기순' },
  ];

  const getSortButtonClassName = (sortType: PostListSortType) => {
    return `font-bold border-none text-xs ${
      sort === sortType
        ? 'shadow-sm'
        : 'bg-transparent text-primitive-grayText hover:text-primitive-blackPrimary'
    }`;
  };

  const onSortChange = (sortType: PostListSortType) => {
    const baseUrl = `/category/${category}?&page=1&sort=${sortType}&size=5&currentPostId=${currentPostId}`;
    const searchParams = searchMode
      ? `&searchMode=true&searchTarget=${searchTarget}&searchKeyword=${searchKeyword}`
      : '';
    const url = `${baseUrl}${searchParams}`;
    router.push(url);
  };

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-primitive-grayWeakest border border-primitive-grayThird">
      {sortOptions.map((option) => (
        <Button
          key={option.value}
          variant="tertiary"
          onClick={() => onSortChange(option.value)}
          className={getSortButtonClassName(option.value)}
        >
          <span className="flex items-center gap-1">
            {option.value === 'LATEST' ? (
              <RiFireLine className="w-4 h-4" />
            ) : (
              <BiTime className="w-4 h-4" />
            )}
            <span className="leading-4">{option.label}</span>
          </span>
        </Button>
      ))}
    </div>
  );
}
