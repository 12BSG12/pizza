import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  authType,
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
  tagTypes: ['pizzaInfo', 'Cart', 'Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
  }),
  endpoints: (builder) => ({
    getPizza: builder.query<pizzaApiType, pizzaArgType>({
      query: ({ page = 1, limit, search, catID, sortTag, sortName }) => ({
        url: `data?${catID !== 0 ? `category=${catID}` : ''}`,
        params: {
          _page: page,
          _limit: limit,
          q: search,
          _sort: sortTag,
          _order: sortName.replace(/\s/g, '').endsWith('(убыв.)') ? 'desc' : 'asc',
        },
      }),
      transformResponse: (response: IPizza[], meta, arg) => {
        return {
          data: response,
          totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
        };
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
    getUser: builder.query<authType, string>({
      query: () => ({
        url: `auth`,
      }),
      providesTags: ['Auth'],
    }),
    setUser: builder.mutation<authType, authType>({
      query: (body) => ({
        url: `auth`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
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
  useGetUserQuery,
  useSetUserMutation,
} = pizzaAPI;
