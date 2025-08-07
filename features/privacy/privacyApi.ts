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
  }),
});

export const { useCreatePrivacyPolicyMutation } = privacyApi;
