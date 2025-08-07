import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBrandAPI, addProductAPI, deleteBrandAPI, deleteProductAPI, filterProductAPI, getAllBrandsAPI, getAllBrandsByCategoryAPI, getAllEnventoryAPI, getAllProductAPI, getByIdProductAPI, updateBrandAPI, updateEnventoryAPI, updateProductAPI } from '../../api/product';
import { IRootState } from '../index';

export const addProductThunk = createAsyncThunk(
  'product/add',
  async (formData: FormData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await addProductAPI(formData, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to add product'
      );
    }
  }
);


// / Update Product
export const updateProductThunk = createAsyncThunk(
  'product/update',
  async (
    { id, formData }: { id: string; formData: FormData },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await updateProductAPI(id, formData, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to update product'
      );
    }
  }
);

// Get All Products
export const getAllProductThunk = createAsyncThunk(
  'product/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await getAllProductAPI(token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch products'
      );
    }
  }
);

// Get Product By ID
export const getByIdProductThunk = createAsyncThunk(
  'product/getById',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await getByIdProductAPI(id, token);
      console.log('Fetched Product:', result); // ADD THIS
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch product'
      );
    }
  }
);

// Filter Products
export const filterProductThunk = createAsyncThunk(
  'product/filter',
  async (params: any, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await filterProductAPI(params, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to filter products'
      );
    }
  }
);

// Delete Product
export const deleteProductThunk = createAsyncThunk(
  'product/delete',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await deleteProductAPI(id, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to delete product'
      );
    }
  }
);

// Add Brand
export const addBrandThunk = createAsyncThunk( 
  'brand/add',
  async (data: { name: string; description: string }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await addBrandAPI(data, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to add brand'
      );
    }
  }
);

// Get All Brands
export const getAllBrandsThunk = createAsyncThunk(
  'brand/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await getAllBrandsAPI(token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch brands'
      );
    }
  }
);

// Get All Brands
export const getAllBrandsByCategoryThunk = createAsyncThunk(
  'brand/getAllBrandsByCategory',
  async (categoryId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await getAllBrandsByCategoryAPI(categoryId, token); // <-- Pass categoryId
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch brands'
      );
    }
  }
);

// Update Brand
export const updateBrandThunk = createAsyncThunk(
  'brand/update',
  async (
    { id, data }: { id: string; data: { name: string; description: string } },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await updateBrandAPI(id, data, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to update brand'
      );
    }
  }
);

// Delete Brand
export const deleteBrandThunk = createAsyncThunk(
  'brand/delete',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await deleteBrandAPI(id, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to delete brand'
      );
    }
  }
);



// Get All Inventory
export const getAllInventoryThunk = createAsyncThunk(
  'inventory/getAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await getAllEnventoryAPI(token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to fetch inventory'
      );
    }
  }
);

// Update Inventory
export const updateInventoryThunk = createAsyncThunk(
  'inventory/update',
  async (
    { id, data }: { id: string; data: { productName?: string; stockAvailable?: number; productStatus?: boolean } },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as IRootState;
      const token = state.auth.token;
      if (!token) {
        return rejectWithValue('Authentication token missing.');
      }
      const result = await updateEnventoryAPI(id, data, token);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || error || 'Failed to update inventory'
      );
    }
  }
);
