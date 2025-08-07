// src/features/faq/faqApi.ts
import { baseApi } from '../../src/api/baseApi';

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<any[], void>({
      query: () => '/faqs',
      transformResponse: (response: { message: string; data: any[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Faqs' as const, id })),
              { type: 'Faqs', id: 'LIST' },
            ]
          : [{ type: 'Faqs', id: 'LIST' }],
    }),

    getFaqById: builder.query<any, number | string>({
      query: (id) => `/faqs/${id}`,
      transformResponse: (response: { message: string; data: any }) => response.data,
      providesTags: (result, error, id) => [{ type: 'Faqs', id }],
    }),

    createFaq: builder.mutation<any, { question: string; answer: string }>({
      query: (faq) => ({
        url: '/faqs',
        method: 'POST',
        body: faq,
      }),
      // Invalidate list so getFaqs refetches
      invalidatesTags: [{ type: 'Faqs', id: 'LIST' }],
    }),

    updateFaq: builder.mutation<
      any,
      { id: number | string; question: string; answer: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/faqs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Faqs', id }],
    }),

    deleteFaq: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Faqs', id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFaqsQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;

