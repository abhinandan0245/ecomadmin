import { baseApi } from '../../src/api/baseApi';

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBanner: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/banner',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Banner'],
    }),

    getAllBanners: builder.query<any[], void>({
      query: () => '/banners-admin',
        providesTags: ['Banner'], // ✅ necessary for auto-refetching after update
    }),

    getBannerById: builder.query<any, string | number>({
      query: (id) => `/banner/${id}`,
      providesTags: (result, error, id) => [{ type: 'Banner', id }],
    }),

    updateBanner: builder.mutation<any, { id: string | number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/banner/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Banner', id } , 'Banner'],
    }),

    deleteBanner: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/banner/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner'],
    }),
  }),
});

export const {
  useCreateBannerMutation,
  useGetAllBannersQuery,
  useGetBannerByIdQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
