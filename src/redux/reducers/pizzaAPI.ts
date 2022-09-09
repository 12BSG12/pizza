import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories, IPizza, ISort } from '../../models/pizzaAPIType';

type pizzaApiType = {
  data: IPizza[]
  totalCount: number
}

export const pizzaAPI = createApi({
  reducerPath: 'pizzaAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (builder) => ({
    getPizza: builder.query<pizzaApiType, {page: number, limit: number, sortName: string, catID: number; sortTag: 'title' | 'price' | 'category'}>({
      query: ({page = 1, limit}) => ({
        url: `data?_page=${page}&_limit=${limit}`,
      }),
      transformResponse: (response: IPizza[], meta, arg) => {
        const sortResponse = (response: IPizza[]) => {
          const sortTagName = (a: IPizza, b: IPizza) => a.title.localeCompare(b.title);
          
          if(arg.sortName.replace(/\s/g, '').endsWith('(убыв.)')) {
            if(arg.sortTag === 'title') return response.sort(sortTagName).reverse()
            return response.sort((a: any, b: any) => b[arg.sortTag] - a[arg.sortTag]);
          }
          else {
            if(arg.sortTag === 'title') return response.sort(sortTagName)
            return response.sort((a: any, b: any) => a[arg.sortTag] - b[arg.sortTag]);
          }
        };
        if (arg.catID !== 0) {
          return { data: sortResponse(response.filter((item) => item.category === arg.catID)),
            totalCount: Number(meta?.response?.headers.get('X-Total-Count'))
          }
        } else {
          return {data: sortResponse(response),
            totalCount: Number(meta?.response?.headers.get('X-Total-Count'))
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
  }),
});

export const { useGetPizzaQuery, useGetCategoriesQuery, useGetSortQuery } = pizzaAPI;
