export type sortType = {
  sortTag: 'price' | 'category' | 'title';
  sortName: string;
  currentPage: number;
} & categoriesType;

export type categoriesType = {
  catID: number;
  title: string;
};