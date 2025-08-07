import { createSlice } from '@reduxjs/toolkit';
import {
  createCouponThunk,
  getAllCouponsThunk,
  getByIdCouponsThunk,
  updateCouponsThunk,
  deleteCouponsThunk,
} from '../thunks/couponThunk';

interface CouponState {
  coupons: any[];
  selectedCoupon: any | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: CouponState = {
  coupons: [],
  selectedCoupon: null,
  loading: false,
  error: null,
  successMessage: null,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    clearCouponMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearSelectedCoupon: (state) => {
      state.selectedCoupon = null;
    },
    
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createCouponThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCouponThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = 'Coupon created successfully.';
      state.coupons.push(action.payload); // assuming payload is one coupon
    });
    builder.addCase(createCouponThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get All
    builder.addCase(getAllCouponsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCouponsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = action.payload; // array of coupons
    });
    builder.addCase(getAllCouponsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get By ID
    builder.addCase(getByIdCouponsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getByIdCouponsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCoupon = action.payload;
    });
    builder.addCase(getByIdCouponsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updateCouponsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCouponsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = 'Coupon updated successfully.';
      const updatedCoupon = action.payload;
      state.coupons = state.coupons.map((coupon) =>
        coupon.id === updatedCoupon.id ? updatedCoupon : coupon
      );
    });
    builder.addCase(updateCouponsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete
    builder.addCase(deleteCouponsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCouponsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = 'Coupon deleted successfully.';
      const deletedId = action.payload; // assuming payload is deleted ID
      state.coupons = state.coupons.filter((c) => c.id !== deletedId);
    });
    builder.addCase(deleteCouponsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
  },
});

export const { clearCouponMessages, clearSelectedCoupon } = couponSlice.actions;
export default couponSlice.reducer;
