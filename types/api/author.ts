// 작성자 정보 타입
export interface Author {
  memberId: number;
  nickname: string;
  role: string;
  status: AuthorStatus;
}

export type AuthorStatus = 'ACTIVE' | 'BLOCKED' | 'DELETED';
