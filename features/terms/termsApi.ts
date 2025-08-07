// src/features/terms/termsApi.ts
import { baseApi } from '../../src/api/baseApi';

export const termsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTermsConditions: builder.mutation({
      query: (body) => ({
        url: '/terms-conditions',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateTermsConditionsMutation } = termsApi;
