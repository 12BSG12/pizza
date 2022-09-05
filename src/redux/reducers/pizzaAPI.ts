import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPizza } from '../../models/pizzaAPIType';

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
  }),
});

export const { useGetPizzaQuery } = pizzaAPI;
