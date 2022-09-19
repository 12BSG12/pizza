import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  cartDataType,
  ICategories,
  IPizza,
  ISort,
  pizzaApiType,
  pizzaArgType,
  pizzaInfoType,
} from '../../models/pizzaAPIType';

export const pizzaAPI = createApi({
  reducerPath: 'pizzaAPI',
  tagTypes: ['pizzaInfo', 'Cart'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (builder) => ({
    getPizza: builder.query<pizzaApiType, pizzaArgType>({
      query: ({ page = 1, limit, search }) => ({
        url: `data?_page=${page}&_limit=${limit}&q=${search}`,
      }),
      transformResponse: (response: IPizza[], meta, arg) => {
        const sortResponse = (response: IPizza[]) => {
          const sortTagName = (a: IPizza, b: IPizza) => a.title.localeCompare(b.title);

          if (arg.sortName.replace(/\s/g, '').endsWith('(убыв.)')) {
            if (arg.sortTag === 'title') return response.sort(sortTagName).reverse();
            return response.sort((a: any, b: any) => b[arg.sortTag] - a[arg.sortTag]);
          } else {
            if (arg.sortTag === 'title') return response.sort(sortTagName);
            return response.sort((a: any, b: any) => a[arg.sortTag] - b[arg.sortTag]);
          }
        };
        if (arg.catID !== 0) {
          return {
            data: sortResponse(response.filter((item) => item.category === arg.catID)),
            totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
          };
        } else {
          return {
            data: sortResponse(response),
            totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
          };
        }
      },
    }),
    getCategories: builder.query<ICategories[], string>({
      query: () => ({
        url: `categories`,
      }),
    }),
    getSort: builder.query<ISort[], string>({
      query: () => ({
        url: `sort`,
      }),
    }),
    getPizzaInfo: builder.query<pizzaInfoType, string>({
      query: () => ({
        url: `info`,
      }),
      providesTags: ['pizzaInfo'],
    }),
    setPizzaInfo: builder.mutation<pizzaInfoType, pizzaInfoType>({
      query: (body) => ({
        url: `info`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['pizzaInfo'],
    }),
    getCart: builder.query<cartDataType[], string>({
      query: () => ({
        url: `cart`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cart' as const, id })),
              { type: 'Cart', id: 'LIST' },
              { type: 'Cart', id: 'DEL-LIST' },
            ]
          : [
              { type: 'Cart', id: 'LIST' },
              { type: 'Cart', id: 'DEL-LIST' },
            ],
    }),
    setCart: builder.mutation<cartDataType, cartDataType>({
      query: (body) => ({
        url: `cart`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    updateCart: builder.mutation<cartDataType, cartDataType>({
      query: (body) => ({
        url: `cart/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Cart', id: body.id }],
    }),
    delCart: builder.mutation<cartDataType, number>({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'DEL-LIST' }],
    }),
  }),
});

export const {
  useGetPizzaQuery,
  useGetCategoriesQuery,
  useGetSortQuery,
  useGetPizzaInfoQuery,
  useSetPizzaInfoMutation,
  useGetCartQuery,
  useSetCartMutation,
  useDelCartMutation,
  useUpdateCartMutation,
} = pizzaAPI;
