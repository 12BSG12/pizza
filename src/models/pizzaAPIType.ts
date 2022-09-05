export interface IPizza {
  id: number;
  imageUrl: string;
  title: string;
  types: IType[];
  sizes: ISize[];
  price: number;
  category: number;
  rating: number;
};

export interface ISize {
  id: number,
  size: number
}

export interface IType {
  id: number,
  name: string
}