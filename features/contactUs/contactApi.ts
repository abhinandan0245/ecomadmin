

import { baseApi } from '../../src/api/baseApi';

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (body) => ({
        url: '/contact',
        method: 'POST',
        body,
      }),
    }),
    getContact: builder.query({
      query: () => '/contact',
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetContactQuery,
} = contactApi;
