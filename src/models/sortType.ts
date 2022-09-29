export type sortType = {
  sortTag: 'price' | 'category' | 'title';
  sortName: string;
  currentPage: number;
  searchText: string;
} & categoriesType;

export type categoriesType = {
  catID: number;
  title: string;
};