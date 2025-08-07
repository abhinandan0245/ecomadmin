import { createSlice } from "@reduxjs/toolkit";
import { cancelOrderThunk, getAllOrdersThunk, getByIdOrdersThunk } from "../thunks/orderThunks";

interface OrderState {
  orders: any[];
  selectedOrder: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.orders = [];
      state.selectedOrder = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Get All Orders
      .addCase(getAllOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
  state.loading = false;
  state.orders = action.payload?.data || []; // ✅ Only assign `data` array
})
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Get Order By ID
      .addCase(getByIdOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByIdOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        // state.selectedOrder = action.payload || null;
        state.selectedOrder = action.payload?.data || null; 
      })
      .addCase(getByIdOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Cancel Order
      .addCase(cancelOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrderThunk.fulfilled, (state, action) => {
        state.loading = false;

        // Optional: update the canceled order in the `orders` list
        const canceledOrder = action.payload?.data;
        if (canceledOrder && canceledOrder._id) {
          state.orders = state.orders.map((order) =>
            order._id === canceledOrder._id ? canceledOrder : order
          );

          // Also update selectedOrder if it's the same one
          if (state.selectedOrder?._id === canceledOrder._id) {
            state.selectedOrder = canceledOrder;
          }
        }
      })
      .addCase(cancelOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
