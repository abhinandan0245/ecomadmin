import { createSlice } from '@reduxjs/toolkit';
import { getAllInventoryThunk, updateInventoryThunk } from '../thunks/productThunk';

interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  stockAvailable: number;
  status: 'in-stock' | 'out-of-stock';
  productStatus: boolean;
  // Add other fields as needed
}

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Inventory
    builder.addCase(getAllInventoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllInventoryThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(getAllInventoryThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Inventory
    builder.addCase(updateInventoryThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateInventoryThunk.fulfilled, (state, action) => {
      state.loading = false;
      const updated = action.payload.data || action.payload;
      state.items = state.items.map((item) =>
        item.id === updated.id ? { ...item, ...updated } : item
      );
    });
    builder.addCase(updateInventoryThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default inventorySlice.reducer;