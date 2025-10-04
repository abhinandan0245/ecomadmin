



import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addCategoryAPI,
  deleteCategoryApi,
  getAllCategoryAPI,
  getByIdCategoryAPI,
  getCategorySizesAPI,
  getSearchByNameCategoryAPI,
  updateCategoryApi,
} from '../../api/categoryApi';
import { IRootState } from '../index';

// Add Category
// Add Category
export const addCategoryThunk = createAsyncThunk<
  any,
  FormData,
  { state: IRootState; rejectValue: string }
>('category/addCategory', async (formData, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const result = await addCategoryAPI(formData, token);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.msg || 'Category creation failed');
  }
});

// Update Category
export const updateCategoryThunk = createAsyncThunk<
  any,
  { id: string; updatedData: FormData },
  { state: IRootState; rejectValue: string }
>('category/updateCategory', async ({ id, updatedData }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const data = await updateCategoryApi(id, updatedData, token);
    return { id, data };
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Update Category failed');
  }
});


// Get All Categories
export const getAllCategoryAPIThunk = createAsyncThunk<
  any,
  void,
  { state: IRootState; rejectValue: string }
>('category/allCategory', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const result = await getAllCategoryAPI(token);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.msg || 'Category fetch failed');
  }
});

// Delete Category
export const deleteCategoryThunk = createAsyncThunk<
  any,
  { id: string },
  { state: IRootState; rejectValue: string }
>('category/deleteCategory', async ({ id }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const data = await deleteCategoryApi(id, token);
    return { id, data };
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Delete category failed');
  }
});

// Get Category By ID
export const getCategoryByIdThunk = createAsyncThunk<
  any,
  { id: string },
  { state: IRootState; rejectValue: string }
>('category/getById', async ({ id }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const response = await getByIdCategoryAPI(id, token);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Failed to fetch category by ID');
  }
});

// Search Category By Name
export const searchCategoryByNameThunk = createAsyncThunk<
  any,
  { name: string },
  { state: IRootState; rejectValue: string }
>('category/searchByName', async ({ name }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const response = await getSearchByNameCategoryAPI(name, token);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || 'Failed to search category');
  }
});

// Add this new thunk to your existing thunk file
export const getSizesByCategoryThunk = createAsyncThunk<
  string[], // Return type (array of strings)
  { categoryId: string }, // Parameters
  { state: IRootState; rejectValue: string }
>('category/getSizes', async ({ categoryId }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const sizes = await getCategorySizesAPI(categoryId, token);
    return sizes;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch sizes');
  }
});