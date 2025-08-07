 import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUser,
  signupUser,
  getProfile,
  updatePassword,
  updateProfileDetails,
  uploadProfileImage,
} from '../../api/authApi';
import { IRootState } from '../index';

// ✅ Login Thunk
export const loginUserThunk = createAsyncThunk<
  { token: string; user: any }, // return type
  { email: string; password: string }, // arg
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await loginUser(email, password);
    return res;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.msg || 'Login failed');
  }
});

// ✅ Signup Thunk
export const signupUserThunk = createAsyncThunk<
  { token: string; user: any },
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/signupUser', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const res = await signupUser(name, email, password);
    return res;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.msg || 'Signup failed');
  }
});

// ✅ Fetch Profile Thunk
export const getProfileThunk = createAsyncThunk<
  any, // return type
  void,
  { state: IRootState; rejectValue: string }
>('auth/getProfile', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const res = await getProfile(token);
    return res;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.msg || 'Profile fetch failed');
  }
});

// ✅ Upload Profile Image Thunk
export const uploadProfileImageThunk = createAsyncThunk<
  any,
  { imageData: FormData },
  { state: IRootState; rejectValue: string }
>('auth/uploadProfileImage', async ({ imageData }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const res = await uploadProfileImage(imageData, token);
    return res.user;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.msg || 'Upload failed');
  }
});

// ✅ Update Profile Details Thunk
export const updateProfileDetailsThunk = createAsyncThunk<
  any,
  { profileData: any },
  { state: IRootState; rejectValue: string }
>('auth/updateProfileDetails', async ({ profileData }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const res = await updateProfileDetails(profileData, token);
    return res.user;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.msg || 'Update failed');
  }
});

// ✅ Update Password Thunk
export const updatePasswordThunk = createAsyncThunk<
  string, // return message
  {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  },
  { state: IRootState; rejectValue: string }
>('auth/changePassword', async (data, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    if (!token) throw new Error('Token not found');
    const res = await updatePassword(data, token);
    return res.msg;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.msg || 'Password update failed');
  }
});
