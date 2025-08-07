import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRootState } from "..";
import { cancelOrderAPI, getAllOrderAPI, getByIdOrderAPI } from "../../api/orderApi";


// payload type
interface IOrderParams {
  status?: string;
 
}
// ✅ Get All Orders
export const getAllOrdersThunk = createAsyncThunk(
  'orders/getAll',
  async (params: IOrderParams, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      

      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }

      const result = await getAllOrderAPI(token , params);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error?.message ||
        error ||
        'Failed to fetch orders'
      );
    }
  }
);

// get by id order 

export const getByIdOrdersThunk = createAsyncThunk(
  'orders/getById',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await getByIdOrderAPI(id, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch order'
      );
    }
  }
);
// cancel order 

export const cancelOrderThunk = createAsyncThunk(
  'orders/cancel',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await cancelOrderAPI(id, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to cancel order'
      );
    }
  }
);
