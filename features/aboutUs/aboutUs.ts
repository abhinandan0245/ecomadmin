
import { baseApi } from '../../src/api/baseApi';

export const aboutusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAboutus: builder.mutation({
      query: (body) => ({
        url: '/aboutus',
        method: 'POST',
        body,
      }),
    }),
    getAboutus: builder.query({
      query: () => '/aboutus',
    }),
  }),
});

export const {
  useCreateAboutusMutation,
  useGetAboutusQuery,
} = aboutusApi;