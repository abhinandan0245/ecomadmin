import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './slices/themeConfigSlice';
import authSlice from './slices/authSlice';
import categorySlice from './slices/categorySlice';
import slugSlice from './slices/slugSlice';
import productSlice from './slices/productSlice';
import brandSlice from './slices/brandSlice';
import inventorySlice from './slices/inventorySlice';
import ordersSlice from './slices/orderSlice';
import couponSlice from './slices/couponSlice';
import { baseApi } from '../api/baseApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  auth: authSlice,
  category: categorySlice,
  slug: slugSlice,
  product: productSlice,
  brand: brandSlice,
  inventory: inventorySlice,
  orders: ordersSlice,
  coupon: couponSlice,

  // ✅ Add RTK Query reducer here
  [baseApi.reducerPath]: baseApi.reducer,
});

// ✅ Create a store variable
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for FormData
    }).concat(baseApi.middleware), // ✅ Add this
});
setupListeners(store.dispatch);

// ✅ Export types using the store
export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

