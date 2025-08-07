


import { baseApi } from '../../src/api/baseApi';

export const banner3Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBanner3: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/bannerthree',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Banner3'],
    }),

    getAllBanners3: builder.query<any[], void>({
      query: () => '/bannersthree',
        providesTags: ['Banner3'], //  necessary for auto-refetching after update
    }),

    getBannerById3: builder.query<any, string | number>({
      query: (id) => `/bannerthree/${id}`,
      providesTags: (result, error, id) => [{ type: 'Banner3', id }],
    }),

    updateBanner3: builder.mutation<any, { id: string | number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/bannerthree/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Banner3', id } , 'Banner3'],
    }),

    deleteBanner3: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/bannerthree/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner3'],
    }),
  }),
});

export const {
  useCreateBanner3Mutation,
  useGetAllBanners3Query,
  useGetBannerById3Query,
  useUpdateBanner3Mutation,
  useDeleteBanner3Mutation,
} = banner3Api;
