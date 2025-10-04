// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const baseApi = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api', // your backend URL
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['Faqs' , 'Banner'], // ✅ Required for caching
//   endpoints: () => ({}),
// });
// src/api/baseApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const baseApi = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api',
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem('TOKEN');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['Faqs', 'Banner', 'Customers'], // ✅ Add 'Customers' for future cache support
//   endpoints: () => ({}),
// });


// src/api/baseApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // import { logout } from '../store/slices/authSlice';
// import type { IRootState } from '../store';

// export const baseApi = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api',
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as IRootState).auth.token;
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['Faqs', 'Banner', 'Customer'],

//   // 🔁 Global error handling
//   endpoints: () => ({}),
//   keepUnusedDataFor: 60, // optional
// });


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IRootState } from '../store';
import { logout } from '../store/slices/authSlice'; // ✅ your logout action
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://backend.triliv.in/api',
  baseUrl: 'http://localhost:5000/api',
 prepareHeaders: (headers, { getState }) => {
  const token = (getState() as IRootState).auth.token || localStorage.getItem('TOKEN');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return headers;
}

});

//  Custom wrapper to handle 401 errors globally
const baseQueryWithLogout: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    // Auto logout if token is invalid, expired, or forbidden
    api.dispatch(logout());
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithLogout,
  tagTypes: ['Faqs', 'Banner', 'Banner2' , 'Banner3' , 'WhyShop' ,  'Customers' , 'Transactions' , 'DeliveredOrders' , 'shippingInfo' , 'ContactMessage' , 'Orders' , 'Shipments'], // ✅ Add 'Transactions' and 'DeliveredOrders' for future cache support
  endpoints: () => ({}),
  keepUnusedDataFor: 60,
});
