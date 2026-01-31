import Button from '@/components/ui/Button';
import { usePostListParams } from './PostListParamsContext';
import { PostListSortType } from '@/types/api/postList';
import { RiFireLine } from 'react-icons/ri';
import { BiTime } from 'react-icons/bi';

export default function Sort() {
  const { params, setSort } = usePostListParams();

  const sortOptions = [
    { value: 'LATEST' as const, label: '최신순' },
    { value: 'POPULAR' as const, label: '인기순' },
  ];

  const getSortButtonClassName = (sortType: PostListSortType) => {
    return `font-bold border-none text-xs ${
      params.sort === sortType
        ? 'shadow-sm'
        : 'bg-transparent text-primitive-grayText hover:text-primitive-blackPrimary'
    }`;
  };

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-primitive-grayWeakest border border-primitive-grayThird">
      {sortOptions.map((option) => (
        <Button
          key={option.value}
          variant="tertiary"
          onClick={() => setSort(option.value)}
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
