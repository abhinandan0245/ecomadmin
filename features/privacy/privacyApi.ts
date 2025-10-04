// src/features/privacy/privacyApi.ts
import { baseApi } from '../../src/api/baseApi';

export const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPrivacyPolicy: builder.mutation({
      query: (body) => ({
        url: '/privacy-policy',
        method: 'POST',
        body,
      }),
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: '/privacy-policy',
        method: 'GET',
      }),
      }),
  }),
});

export const { useCreatePrivacyPolicyMutation, useGetPrivacyPolicyQuery } = privacyApi;
