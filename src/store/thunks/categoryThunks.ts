
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { addCategoryAPI, deleteCategoryApi, getAllCategoryAPI, getByIdCategoryAPI, getSearchByNameCategoryAPI, updateCategoryApi } from '../../api/categoryApi';

// export const addCategoryThunk = createAsyncThunk(
//   'category/addCategory',
//   async (data: { name: string; slug: string; status: boolean;}, { getState, rejectWithValue }) => {
//     try {
//       const token = (getState() as any).auth.token;
//       const result = await addCategoryAPI(data , token);
//       return result;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.msg || 'Category creation failed');
//     }
//   }
// );

// // update category thunk 

// export const updateCategoryThunk = createAsyncThunk(
//   'category/updateCategory',
//   async({id , updatedData} : {id:string; updatedData: { name?: string; slug?: string; status?: boolean }}, {rejectWithValue ,getState}) => {
//     try {
//        const token = (getState() as any).auth.token;
//       const data = await updateCategoryApi(id , updatedData, token);
//       return {id , data};
//     } catch (error:any) {
//       return rejectWithValue(error.response?.data || 'Update Category failed');
//     }
//   }
// )


// export const getAllCategoryAPIThunk = createAsyncThunk(
//   'category/allCategory',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const token = (getState() as any).auth.token;
//       const result = await getAllCategoryAPI(token);
//       return result;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.msg || 'Category creation failed');
//     }
//   }
// );

// // delete category thunk 

// export const deleteCategoryThunk = createAsyncThunk(
//   'category/deleteCategory',
//   async({id , token} : {id:string; token: string}, {rejectWithValue}) => {
//     try {
//       const data = await deleteCategoryApi(id , token);
//       return {id , data};
//     } catch (error:any) {
//       return rejectWithValue(error.response?.data || 'Delete category failed');
//     }
//   }
// )





// // Thunk to get category by ID
// export const getCategoryByIdThunk = createAsyncThunk(
//   'category/getById',
//   async ({ id, token }: { id: string; token: string }, thunkAPI) => {
//     try {
//       const response = await getByIdCategoryAPI(id, token);
//       return response;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch category by ID');
//     }
//   }
// );

// // Thunk to search category by name
// export const searchCategoryByNameThunk = createAsyncThunk(
//   'category/searchByName',
//   async ({ name, token }: { name: string; token: string }, thunkAPI) => {
//     try {
//       const response = await getSearchByNameCategoryAPI(name, token);
//       return response;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response?.data || 'Failed to search category');
//     }
//   }
// );



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
export const addCategoryThunk = createAsyncThunk<
  any, // Replace 'any' with your Category type if available
  { name: string; slug: string; status: boolean , size?: string[]},
  { state: IRootState; rejectValue: string }
>('category/addCategory', async (data, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const result = await addCategoryAPI(data, token);
    return result;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.msg || 'Category creation failed');
  }
});

// Update Category
export const updateCategoryThunk = createAsyncThunk<
  any,
  { id: string; updatedData: { name?: string; slug?: string; status?: boolean , size?: string[] } },
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