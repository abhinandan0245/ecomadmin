import { createCouponApi, deleteCouponsApi, getAllCouponsApi, getByIdCouponsApi, toggleCouponStatusApi, updateCouponsApi } from "../../api/couponApi";
import { IRootState } from "..";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createCouponThunk = createAsyncThunk(
  'coupon/create',
  async (couponData: any, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await createCouponApi(couponData, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to add product'
      );
    }
  }
);

export const getAllCouponsThunk = createAsyncThunk(
  'coupon/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await getAllCouponsApi(token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch coupons'
      );
    }
  }
);

export const updateCouponsThunk = createAsyncThunk(
  'coupon/update',
  async ({ id, couponData }: { id: string; couponData: any }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await updateCouponsApi(token, id, couponData);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch coupons'
      );
    }
  }
);

export const updateStatusToggle = createAsyncThunk(
  'coupon/updateStatus',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await toggleCouponStatusApi(token, id);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch coupons'
      );
    }
  }
);

export const getByIdCouponsThunk = createAsyncThunk(
  'coupon/getById',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await getByIdCouponsApi(token, id);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch coupons'
      );
    }
  }
);
export const deleteCouponsThunk = createAsyncThunk(
  'coupon/delete',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await deleteCouponsApi(token, id);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch coupons'
      );
    }
  }
);