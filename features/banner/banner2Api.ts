import { baseApi } from '../../src/api/baseApi';

export const banner2Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBanner2: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/bannertwo',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Banner2'],
    }),

    getAllBanners2: builder.query<any[], void>({
      query: () => '/bannerstwo', 
      transformResponse: (response:any) => response.banners, // <- unwrap here
        providesTags: ['Banner2'], // necessary for auto-refetching after update
    }),

    getBannerById2: builder.query<any, string | number>({
      query: (id) => `/bannertwo/${id}`,
      providesTags: (result, error, id) => [{ type: 'Banner2', id }],
    }),

    updateBanner2: builder.mutation<any, { id: string | number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/bannertwo/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Banner2', id } , 'Banner2'],
    }),

    deleteBanner2: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/bannertwo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner2'],
    }),
  }),
});

export const {
  useCreateBanner2Mutation,
  useGetAllBanners2Query,
  useGetBannerById2Query,
  useUpdateBanner2Mutation,
  useDeleteBanner2Mutation,
} = banner2Api;
