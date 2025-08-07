import { createSlice } from '@reduxjs/toolkit';
import { addBrandThunk, deleteBrandThunk, getAllBrandsByCategoryThunk, getAllBrandsThunk, updateBrandThunk } from '../thunks/productThunk';


interface BrandState {
  loading: boolean;
  success: boolean;
  error: string | null;
  brands: any[]; // Replace with your Brand type/interface if available
  selectedBrand: any | null;
}

const initialState: BrandState = {
  loading: false,
  success: false,
  error: null,
  brands: [],
  selectedBrand: null,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    clearBrandState: (state) => {
      state.success = false;
      state.error = null;
    },
    clearSelectedBrand: (state) => {
      state.selectedBrand = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBrandThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addBrandThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.brands.push(action.payload);
      })
      .addCase(addBrandThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllBrandsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrandsThunk.fulfilled, (state, action) => {
  state.loading = false;
  // Support both array and object with brands property
  state.brands = Array.isArray(action.payload)
    ? action.payload
    : action.payload.brands || [];
})
      .addCase(getAllBrandsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateBrandThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBrandThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updated = action.payload;
        state.brands = state.brands.map((brand) =>
          brand.id === updated.id ? updated : brand
        );
      })
      .addCase(updateBrandThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteBrandThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteBrandThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const deletedId = action.meta.arg;
        state.brands = state.brands.filter((brand) => brand.id !== deletedId);
      })
      .addCase(deleteBrandThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllBrandsByCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrandsByCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = Array.isArray(action.payload)
          ? action.payload
          : action.payload.brands || [];
      })
      .addCase(getAllBrandsByCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

  },
});

export const { clearBrandState, clearSelectedBrand } = brandSlice.actions;
export default brandSlice.reducer;