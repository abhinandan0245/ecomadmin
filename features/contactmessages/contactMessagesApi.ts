

import { baseApi } from '../../src/api/baseApi';

export const contactMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getContactMessage: builder.query({
      query: () => '/contact-message',
      providesTags: ["ContactMessage"],
    }),
    // (optional) Delete message
    deleteContactMessage: builder.mutation({
      query: (id) => ({
        url: `/contact-message/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ContactMessage"],
    }),
  }),
});

export const {
  useGetContactMessageQuery,
  useDeleteContactMessageMutation,
} = contactMessageApi;
