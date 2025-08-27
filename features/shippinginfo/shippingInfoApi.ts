

import { baseApi } from '../../src/api/baseApi';

export const shippingInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShippingInfo: builder.mutation({
      query: (body) => ({
        url: '/shipping-info',
        method: 'POST',
        body,
      }),
    }),
    getShippingInfo: builder.query({
      query: () => '/shipping-info',
    }),
  }),
});

export const {
  useCreateShippingInfoMutation,
  useGetShippingInfoQuery,
} = shippingInfoApi;
