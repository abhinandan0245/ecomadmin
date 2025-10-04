// src/features/order/orderApi.ts or similar
import { baseApi } from '../../src/api/baseApi';
import { Order } from '../../src/types';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<{ success: boolean; count: number; data: Order[] }, void>({
      query: () => '/order',
      providesTags: ['Orders'],
    }),
    
    getOrderById: builder.query<{ success: boolean; data: Order }, number>({
      query: (id) => `/order/${id}`,
      providesTags: ['Orders'],
    }),

    cancelOrder: builder.mutation<{ message: string }, number>({
      query: (orderId) => ({
        url: `/order/${orderId}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { 
  useGetAllOrdersQuery, 
  useGetOrderByIdQuery, 
  useCancelOrderMutation 
} = orderApi;
