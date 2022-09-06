import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories, IPizza, ISort } from '../../models/pizzaAPIType';

export const pizzaAPI = createApi({
  reducerPath: 'pizzaAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (builder) => ({
    getPizza: builder.query<IPizza[], string>({
      query: () => ({
        url: `data`,
      }),
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
