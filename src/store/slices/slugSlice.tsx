import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSlugThunk, suggestionSlugThunk } from "../thunks/slugThunks";

interface SlugState {
  slugs: string[];         // Suggestions
  addedSlug: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SlugState = {
  slugs: [],
  addedSlug: null,
  loading: false,
  error: null,
};

const slugSlice = createSlice({
  name: "slug",
  initialState,
  reducers: {
    resetSlugState: (state) => {
      state.slugs = [];
      state.addedSlug = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Suggestion Slugs
    builder
      .addCase(suggestionSlugThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(suggestionSlugThunk.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.slugs = action.payload;
        state.error = null;
       
      })
      .addCase(suggestionSlugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch suggestions';
      });

    // Add Slug
    builder
      .addCase(addSlugThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSlugThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.addedSlug = action.payload;

        // Also push to slugs if not already there
        if (!state.slugs.includes(action.payload)) {
          state.slugs.push(action.payload);
        }
      })
      .addCase(addSlugThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to add slug';
      });
  },
});

export const { resetSlugState } = slugSlice.actions;
export default slugSlice.reducer;
