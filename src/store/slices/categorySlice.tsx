import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCategoryThunk, deleteCategoryThunk, getAllCategoryAPIThunk, updateCategoryThunk, getCategoryByIdThunk, searchCategoryByNameThunk, getSizesByCategoryThunk } from '../thunks/categoryThunks';

interface Category {
    id: string;
    name: string;
    slug: string;
    status: boolean;
     size?: string[];
}

interface CategoryState {
    loading: boolean;
    error: string | null;
    success: boolean;
    categories: Category[];
    selectedCategory: Category | null;
    searchedCategories: Category[];
     sizes: string[]; // Add this new property
    sizesLoading: boolean;
    sizesError: string | null;
}

const initialState: CategoryState = {
    loading: false,
    error: null,
    success: false,
    categories: [],
    selectedCategory: null,
    searchedCategories: [],
        sizes: [], // Initialize sizes array
    sizesLoading: false,
    sizesError: null,

};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resetCategoryState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
          // Add these new reducers
        clearSizes: (state) => {
            state.sizes = [];
            state.sizesError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCategoryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addCategoryThunk.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addCategoryThunk.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload ?? 'Unknown error';
            })

            // Get All Categories
            .addCase(getAllCategoryAPIThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategoryAPIThunk.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategoryAPIThunk.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch categories';
            })

            // delete category

            .addCase(deleteCategoryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter((cat) => cat.id !== action.payload.id);
            })
            .addCase(deleteCategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // update category

            .addCase(updateCategoryThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategoryThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = {
                        ...state.categories[index],
                        ...action.payload.data, // merging updated fields
                    };
                }
            })
            .addCase(updateCategoryThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            // Get Category by ID
.addCase(getCategoryByIdThunk.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(getCategoryByIdThunk.fulfilled, (state, action: PayloadAction<Category>) => {
  state.loading = false;
  state.selectedCategory = action.payload;
})
.addCase(getCategoryByIdThunk.rejected, (state, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload ?? 'Failed to fetch category by ID';
})

// Search Categories by Name
.addCase(searchCategoryByNameThunk.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(searchCategoryByNameThunk.fulfilled, (state, action: PayloadAction<Category[]>) => {
  state.loading = false;
  state.searchedCategories = action.payload;
})
.addCase(searchCategoryByNameThunk.rejected, (state, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload ?? 'Failed to search categories';
})
 // Add this new case for getSizesByCategoryThunk
        builder
            .addCase(getSizesByCategoryThunk.pending, (state) => {
                state.sizesLoading = true;
                state.sizesError = null;
            })
            .addCase(getSizesByCategoryThunk.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.sizesLoading = false;
                state.sizes = action.payload;
            })
            .addCase(getSizesByCategoryThunk.rejected, (state, action: PayloadAction<any>) => {
                state.sizesLoading = false;
                state.sizesError = action.payload ?? 'Failed to fetch sizes';
            });


    },
});

export const { resetCategoryState , clearSizes } = categorySlice.actions;
export default categorySlice.reducer;
