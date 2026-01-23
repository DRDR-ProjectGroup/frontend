'use client';

import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import InputText from '../ui/InputText';
import { usePostListParams } from './postListParamsContext';

export default function PostSearch() {
  const { params, applySearch, clearSearch } = usePostListParams();
  const [target, setTarget] = useState(params.searchTarget || 'Title');
  const [keyword, setKeyword] = useState(params.searchKeyword || '');

  const onSubmit = () => {
    // 빈 키워드면 검색 해제
    if (!keyword.trim()) {
      clearSearch();
      return;
    }
    applySearch(target, keyword.trim());
  };

  return (
    <div className="flex items-center gap-2 mt-6 mb-4">
      <select
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="border-primitive-grayPrimary h-[36px] w-[131px] rounded-md border px-3 text-sm"
      >
        <option value="Title">제목</option>
        <option value="Content">내용</option>
        <option value="Author">작성자</option>
      </select>
      <div className="flex-1 h-[36px] relative">
        <InputText
          className="h-full w-full"
          value={keyword}
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