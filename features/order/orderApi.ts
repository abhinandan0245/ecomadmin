// src/features/order/orderApi.ts or similar
import { baseApi } from '../../src/api/baseApi';
import { Order } from '../../src/types';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Delivered orders list
    getDeliveredOrders: builder.query<{ data: Order[] }, void>({
      query: () => ({
        url: '/orders/delivered/list?status=Delivered',
        method: 'GET',
      }),
      providesTags: ['DeliveredOrders'],
    }),
  }),
});

export const { useGetDeliveredOrdersQuery } = orderApi;
