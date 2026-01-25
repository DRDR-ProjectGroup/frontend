 'use client';
 
 import type { PostListParams } from '@/lib/api/post.server';
 import {
   createContext,
   ReactNode,
   useContext,
   useMemo,
   useState,
 } from 'react';
 
 type PostListParamsWithDefaults = Required<
   Pick<PostListParams, 'page' | 'size' | 'sort'>
 > &
   Pick<PostListParams, 'category' | 'searchTarget' | 'searchKeyword'>;
 
 type PostListParamsContextValue = {
   params: PostListParamsWithDefaults;
   setPage: (page: number) => void;
   applySearch: (searchTarget: string, searchKeyword: string) => void;
   clearSearch: () => void;
 };
 
 const PostListParamsContext = createContext<PostListParamsContextValue | null>(
   null,
 );
 
 export function PostListParamsProvider({
   initialCategory = 'all',
   children,
 }: {
   initialCategory?: string;
   children: ReactNode;
 }) {
   // category는 상위에서 내려주는 값을 그대로 사용 (Provider remount로 초기화 처리)
   const category = initialCategory;
   const [page, setPage] = useState<number>(1);
   const [size] = useState<number>(20);
   const [sort] = useState<'POPULAR' | 'LATEST'>('POPULAR');
   const [searchTarget, setSearchTarget] = useState<string>('');
   const [searchKeyword, setSearchKeyword] = useState<string>('');
 
   const value = useMemo<PostListParamsContextValue>(() => {
     const params: PostListParamsWithDefaults = {
       category,
       page,
       size,
       sort,
       searchTarget,
       searchKeyword,
     };
 
     return {
       params,
       setPage: (next) => setPage(Math.max(1, next)),
       applySearch: (target, keyword) => {
         setSearchTarget(target);
         setSearchKeyword(keyword);
         setPage(1);
       },
       clearSearch: () => {
         setSearchTarget('');
         setSearchKeyword('');
         setPage(1);
       },
     };
   }, [category, page, size, sort, searchTarget, searchKeyword]);
 
   return (
     <PostListParamsContext.Provider value={value}>
       {children}
     </PostListParamsContext.Provider>
   );
 }
 
 export function usePostListParams() {
   const ctx = useContext(PostListParamsContext);
   if (!ctx) {
     throw new Error('usePostListParams must be used within PostListParamsProvider');
   }
   return ctx;
 }
 
