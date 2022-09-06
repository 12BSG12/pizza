import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories, IPizza, ISort } from '../../models/pizzaAPIType';

export const pizzaAPI = createApi({
  reducerPath: 'pizzaAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (builder) => ({
    getPizza: builder.query<IPizza[], { catID: number; sortTag: 'title' | 'price' | 'category' }>({
      query: () => ({
        url: `data`,
      }),
      transformResponse: (response: IPizza[], meta, arg) => {
        if (arg.catID !== 0) {
          return response
            .filter((item) => item.category === arg.catID)
            .sort((a: any, b: any) => a[arg.sortTag] - b[arg.sortTag]);
        } else {
          return response.sort((a: any, b: any) => a[arg.sortTag] - b[arg.sortTag]);
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
  }),
});

export const { useGetPizzaQuery, useGetCategoriesQuery, useGetSortQuery } = pizzaAPI;
