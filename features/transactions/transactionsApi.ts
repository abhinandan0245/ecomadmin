import { baseApi } from '../../src/api/baseApi';
import type { Transaction, TransactionListResponse } from '../../src/types/index';

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query<TransactionListResponse, void>({
      query: () => '/transactions',
      providesTags: ['Transactions'],
    }),

    getTransactionById: builder.query<Transaction, string>({
      query: (id) => `/transactions/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Transactions', id }],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
} = transactionApi;
