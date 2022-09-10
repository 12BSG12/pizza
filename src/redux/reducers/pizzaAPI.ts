import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICategories,
  IPizza,
  ISort,
  pizzaApiType,
  pizzaArgType,
  pizzaInfoType,
} from '../../models/pizzaAPIType';

export const pizzaAPI = createApi({
  reducerPath: 'pizzaAPI',
  tagTypes: ['pizzaInfo'],
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
    getPizzaInfo: builder.query<pizzaInfoType[], string>({
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
    delPizzaInfo: builder.mutation<pizzaInfoType, number>({
      query: (id) => ({
        url: `info/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['pizzaInfo'],
    }),
  }),
});

export const {
  useGetPizzaQuery,
  useGetCategoriesQuery,
  useGetSortQuery,
  useGetPizzaInfoQuery,
  useSetPizzaInfoMutation,
  useDelPizzaInfoMutation,
} = pizzaAPI;
