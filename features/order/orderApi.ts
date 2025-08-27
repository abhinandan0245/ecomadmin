// src/features/order/orderApi.ts or similar
import { baseApi } from '../../src/api/baseApi';
import { Order } from '../../src/types';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllOrders: builder.query<{ success: boolean; count: number; data: Order[] }, void>({
  query: () => '/order',
  providesTags: ['Orders'],
}),

    // Cancel order
    cancelOrder: builder.mutation<{ message: string }, number>({
      query: (orderId) => ({
        url: `/order/${orderId}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders'], // refresh order list automatically
    }),
    
  }),
});

export const { useGetAllOrdersQuery , useCancelOrderMutation } = orderApi;
