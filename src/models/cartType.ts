export type cartDataType = {
  id: number;
  title: string;
  imageUrl: string;
  types: string;
  sizes: number;
  price: number;
  countPizza: number;
};

export type cartType = {
  cartData: cartDataType[];
  allCount: number
  allSum: number
};
