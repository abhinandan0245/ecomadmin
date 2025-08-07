

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
      query: () => '/refund-policy',
    }),
  }),
});

export const {
  useCreateRefundPolicyMutation,
  useGetRefundPolicyQuery,
} = refundPolicyApi;
