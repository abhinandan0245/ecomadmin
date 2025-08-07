// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updatePasswordThunk, updateProfileDetailsThunk, uploadProfileImageThunk } from '../thunks/authThunks';

const tokenFromStorage = localStorage.getItem('TOKEN');
const userFromStorageString = localStorage.getItem('USER');
const userFromStorage = (userFromStorageString && userFromStorageString !== 'undefined')
  ? JSON.parse(userFromStorageString)
  : null;

  if (localStorage.getItem('USER') === 'undefined') {
    localStorage.removeItem('USER');
  }

interface AuthState {
  user: any; // you can define a proper User type here
  token: string | null;
  loading: boolean;
  error: string | null;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  successMessage: string | null,
}

const initialState: AuthState = {
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
  status: 'idle',
  successMessage: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
  state.loading = false;
  state.token = action.payload.token;
  state.user = action.payload.user;
  localStorage.setItem('TOKEN', action.payload.token);   // ✅ persist token
  localStorage.setItem('USER', JSON.stringify(action.payload.user));
},
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     
    // signup 
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
  state.loading = false;
  state.token = action.payload.token;
  state.user = action.payload.user;
  localStorage.setItem('TOKEN', action.payload.token);   // ✅ persist token
  localStorage.setItem('USER', JSON.stringify(action.payload.user));
},
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
  state.user = null;
  state.token = null;
  state.loading = false;
  state.error = null;
  localStorage.removeItem('TOKEN');   // ✅ clear token
  localStorage.removeItem('USER');
},

    // profile 
    setProfile: (state, action) => {
      state.user = action.payload;
    },
  },

  //  profile image uploader 

  extraReducers: (builder) => {
    builder
      .addCase(uploadProfileImageThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadProfileImageThunk.fulfilled, (state, action) => {
    
        state.status = 'succeeded';
        state.user = action.payload;
          // ✅ Store updated user in localStorage
          localStorage.setItem('USER', JSON.stringify(action.payload)); // keep in sync
      })
      .addCase(uploadProfileImageThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? 'Something went wrong';
      })

      // ✅ Update Profile Details
    .addCase(updateProfileDetailsThunk.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateProfileDetailsThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      localStorage.setItem('USER', JSON.stringify(action.payload));
    })
    .addCase(updateProfileDetailsThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error?.message ?? 'Profile update failed';
    })
      // ✅ Update password 
    .addCase(updatePasswordThunk.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updatePasswordThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.successMessage = 'Password changed successfully!';
      // state.user = action.payload;
    })
    .addCase(updatePasswordThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error?.message ?? 'Password update failed';
    });

  },
});

export const { loginStart, loginSuccess, loginFailure, signupStart , signupSuccess , signupFailure ,  logout , setProfile } = authSlice.actions;
export default authSlice.reducer;
