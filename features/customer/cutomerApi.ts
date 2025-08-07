// src/features/customer/adminCustomerApi.ts
import { baseApi } from '../../src/api/baseApi';

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: All customers
    getAllCustomers: builder.query<{ customers: any[] }, void>({
      query: () => '/customer',
      providesTags: ['Customers'], // ✅ This enables cache invalidation
    }),

    // GET: Single customer by ID
    getCustomerById: builder.query<{ message: string; customer: any }, string>({
      query: (id) => `/customer/${id}`,
    }),

    // DELETE: Customer by ID (Admin only)
    deleteCustomer: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/customer/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
  overrideExisting: false,
  
});

export const {
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useDeleteCustomerMutation,
} = customerApi;
