import { createAsyncThunk } from '@reduxjs/toolkit';
import { addSlugApi, suggestionSlugApi } from '../../api/slugApi';

interface SlugItem {
  name: string;
}

//  Fetch suggestions
export const suggestionSlugThunk = createAsyncThunk(
  'slug/suggestions',
  async (query: string, {getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      if (!token) {
        throw new Error("User token not found.");
      }
      const response: SlugItem[] = await suggestionSlugApi(query , token);
      console.log("data 2 reponse :",response);
      return response.map((item) => item.name);
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.error ?? err.message ?? 'Failed to fetch suggestions'
      );
    }
  }
);

//  Add new slug
export const addSlugThunk = createAsyncThunk(
  'slug/add',
  async (name: string, {getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      if (!token) {
        throw new Error("User token not found.");
      }
      const response: SlugItem = await addSlugApi(name , token);
      return response.name;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.error ?? err.message ?? 'Failed to add slug'
      );
    }
  }
);
