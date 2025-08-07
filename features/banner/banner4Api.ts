import { baseApi } from '../../src/api/baseApi';

export const banner4Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBanner4: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/why-shop',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['WhyShop'],
    }),

    getAllBanners4: builder.query<any[], void>({
      query: () => '/why-shop', 
      transformResponse: (response:any) => response, // <- unwrap here
        providesTags: ['WhyShop'], // necessary for auto-refetching after update
    }),

    getBannerById4: builder.query<any, string | number>({
      query: (id) => `/why-shop/${id}`,
      providesTags: (result, error, id) => [{ type: 'WhyShop', id }],
    }),

    updateBanner4: builder.mutation<any, { id: string | number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/why-shop/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'WhyShop', id } , 'WhyShop'],
    }),

    deleteBanner4: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/why-shop/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WhyShop'],
    }),
  }),
});

export const {
  useCreateBanner4Mutation,
  useGetAllBanners4Query,
  useGetBannerById4Query,
  useUpdateBanner4Mutation,
  useDeleteBanner4Mutation,
} = banner4Api;
