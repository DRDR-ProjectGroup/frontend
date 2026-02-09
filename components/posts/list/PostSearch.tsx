'use client';

import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import InputText from '@/components/ui/InputText';
import { PostListParams, PostListSearchTargetType } from '@/types/api/postList';
import { useRouter } from 'next/navigation';

interface PostSearchProps extends PostListParams {}

export default function PostSearch({
  category,
  searchTarget,
  searchKeyword,
}: PostSearchProps) {
  const router = useRouter();
  const [target, setTarget] = useState<PostListSearchTargetType>(
    searchTarget || 'ALL',
  );
  const [keyword, setKeyword] = useState(searchKeyword || '');

  // searchTarget 변수
  const searchTargetOptions = [
    { value: 'ALL', label: '전체' },
    { value: 'TITLE', label: '제목' },
    { value: 'CONTENT', label: '내용' },
    { value: 'AUTHOR', label: '작성자' },
  ];

  // url 이동
  const onSubmit = () => {
    router.push(
      `/category/${category}?searchMode=true&searchTarget=${target}&searchKeyword=${keyword}&page=1&size=5&sort=LATEST`,
    );
  };

  return (
    <div className="flex items-center gap-2 mt-6 mb-4">
      <select
        value={target}
        onChange={(e) => setTarget(e.target.value as PostListSearchTargetType)}
        className="border-primitive-grayPrimary h-[36px] w-[131px] rounded-md border px-3 text-sm"
      >
        {searchTargetOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex-1 h-[36px] relative">
        <InputText
          className="h-full w-full"
          value={keyword}
          placeholder="검색어를 입력해주세요."
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit();
          }}
        />
        <button
          type="button"
          onClick={onSubmit}
          className="absolute right-0 top-0 h-full w-[36px] flex items-center justify-center rounded-md cursor-pointer"
        >
          <FiSearch className="w-4 h-4 text-primitive-grayText" />
          <span className="sr-only">검색하기</span>
        </button>
      </div>
    </div>
  );
}
