import { createSlice } from '@reduxjs/toolkit';
import {
  addProductThunk,
  updateProductThunk,
  getAllProductThunk,
  getByIdProductThunk,
  filterProductThunk,
  deleteProductThunk,
} from '../thunks/productThunk';

// Define proper types
interface Product {
  id?: string;
  productId?: string;
  title: string;
  tags?: string[] | string | null;
  // Add other product fields as needed
}

interface ProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
  products: any[]; // Replace `any` with your Product type/interface if available
  selectedProduct: any | null; // For getById
  filteredProducts: any[]; // For filter results
}

const initialState: ProductState = {
  loading: false,
  success: false,
  error: null,
  products: [],
  selectedProduct: null,
  filteredProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProductState: (state) => {
      state.success = false;
      state.error = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearFilteredProducts: (state) => {
      state.filteredProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD PRODUCT
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload);
        state.filteredProducts.push(action.payload); // keep filteredProducts in sync
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE PRODUCT
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updated = action.payload;
        state.products = state.products.map((prod) =>
          (prod.id || prod.productId) === (updated.id || updated.productId) ? updated : prod
        );
        state.filteredProducts = state.filteredProducts.map((prod) =>
          (prod.id || prod.productId) === (updated.id || updated.productId) ? updated : prod
        );
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET ALL PRODUCTS
      .addCase(getAllProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // set filteredProducts to all on fetch
      })
      .addCase(getAllProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // GET PRODUCT BY ID
      .addCase(getByIdProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(getByIdProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getByIdProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FILTER PRODUCTS
      .addCase(filterProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(filterProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE PRODUCT
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const deletedId = action.meta.arg;
        state.products = state.products.filter(
          (prod) => (prod.id || prod.productId) !== deletedId
        );
        state.filteredProducts = state.filteredProducts.filter(
          (prod) => (prod.id || prod.productId) !== deletedId
        );
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearProductState,
  clearSelectedProduct,
  clearFilteredProducts,
} = productSlice.actions;
export default productSlice.reducer;