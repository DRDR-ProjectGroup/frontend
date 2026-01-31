// 게시글 카테고리 타입
export interface Category {
  categoryId: number,
  categoryName: string,
  categoryAddress: string
}

// 게시글 카테고리 그룹 타입
export interface CategoryGroup {
  groupId: number,
  groupName: string,
  categories: Category[]
}