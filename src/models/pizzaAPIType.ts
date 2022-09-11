export interface IPizza {
  id: number;
  imageUrl: string;
  title: string;
  types: IType[];
  sizes: ISize[];
  price: number;
  category: number;
  rating: number;
}

export interface ISize {
  id: number;
  size: number;
}

export interface IType {
  id: number;
  name: string;
}

export interface ICategories {
  id: number;
  catName: string;
}
export interface ISort {
  id: number;
  sortName: string;
}

export type pizzaApiType = {
  data: IPizza[];
  totalCount: number;
};

export type pizzaArgType = {
  page: number;
  limit: number;
  search?: string;
  sortName: string;
  catID: number;
  sortTag: 'title' | 'price' | 'category';
};

export type pizzaInfoType = {
  title: string | null;
  imageUrl: string | null;
  price: number;
  info: string | null;
}