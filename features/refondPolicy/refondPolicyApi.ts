

import { baseApi } from '../../src/api/baseApi';

export const refundPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRefundPolicy: builder.mutation({
      query: (body) => ({
        url: '/refund-policy',
        method: 'POST',
        body,
      }),
    }),
getRefundPolicy: builder.query({
      query: () => ({
        url: '/refund-policy',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateRefundPolicyMutation,
  useGetRefundPolicyQuery,
} = refundPolicyApi;
