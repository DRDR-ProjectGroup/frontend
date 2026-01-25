import { NavMenuData } from '@/types/api/navMenu';

export const dummy_navMenu: NavMenuData[] = [
  {
    groupId: 1,
    groupName: '테크',
    categories: [
      { categoryId: 1, categoryName: '프로그래밍', categoryAddress: 'prog' },
      { categoryId: 2, categoryName: '하드웨어', categoryAddress: 'hardware' },
      { categoryId: 3, categoryName: '소프트웨어', categoryAddress: 'software' },
      { categoryId: 4, categoryName: '모바일', categoryAddress: 'mobile' },
    ],
  },
  {
    groupId: 2,
    groupName: '게임',
    categories: [
      { categoryId: 5, categoryName: 'PC 게임', categoryAddress: 'pc-game' },
      { categoryId: 6, categoryName: '콘솔 게임', categoryAddress: 'console-game' },
      { categoryId: 7, categoryName: '모바일 게임', categoryAddress: 'mobile-game' },
      { categoryId: 8, categoryName: 'Esports', categoryAddress: 'esports' },
    ],
  },
  {
    groupId: 3,
    groupName: '일상',
    categories: [
      { categoryId: 9, categoryName: '여행', categoryAddress: 'travel' },
      { categoryId: 10, categoryName: '음식', categoryAddress: 'food' },
      { categoryId: 11, categoryName: '건강', categoryAddress: 'health' },
      { categoryId: 12, categoryName: '취미', categoryAddress: 'hobby' },
    ],
  },
  {
    groupId: 4,
    groupName: '문화',
    categories: [
      { categoryId: 13, categoryName: '영화', categoryAddress: 'movie' },
      { categoryId: 14, categoryName: '음악', categoryAddress: 'music' },
      { categoryId: 15, categoryName: '책', categoryAddress: 'book' },
      { categoryId: 16, categoryName: '예술', categoryAddress: 'art' },
    ],
  },
];