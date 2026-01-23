 import Button from '../ui/Button';
 
 export type PaginationProps = {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
   maxVisiblePages?: number;
   className?: string;
   disabled?: boolean;
 };
 
 function clamp(n: number, min: number, max: number) {
   return Math.max(min, Math.min(max, n));
 }
 
 export default function Pagination({
   currentPage,
   totalPages,
   onPageChange,
   maxVisiblePages = 5,
   className,
   disabled = false,
 }: PaginationProps) {
   const safeTotalPages = Math.max(1, totalPages);
   const safeCurrent = clamp(currentPage, 1, safeTotalPages);
 
   const startPage = Math.max(1, safeCurrent - Math.floor(maxVisiblePages / 2));
   const endPage = Math.min(safeTotalPages, startPage + maxVisiblePages - 1);
 
   const pages: number[] = [];
   const adjustedStart = Math.max(1, endPage - maxVisiblePages + 1);
   for (let p = adjustedStart; p <= endPage; p++) pages.push(p);
 
   return (
     <div className={`flex items-center justify-center ${className ?? ''}`}>
       <Button
         variant="tertiary"
         className="border-none"
         disabled={disabled || safeCurrent <= 1}
         onClick={() => onPageChange(safeCurrent - 1)}
       >
         이전
       </Button>
       <div>
         {pages.map((p) => (
           <Button
             key={p}
             variant="tertiary"
             className={`border-none ${p === safeCurrent ? 'font-bold underline' : ''}`}
             disabled={disabled}
             onClick={() => onPageChange(p)}
           >
             {p}
           </Button>
         ))}
       </div>
       <Button
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
 
