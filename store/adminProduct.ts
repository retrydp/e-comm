import { createSlice } from '@reduxjs/toolkit';

interface ApInitialState {
  loading: boolean;
  error: string;
}

const initialState: ApInitialState = {
  loading: false,
  error: '',
};

const adminProduct = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    uploadRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    uploadSuccess: (state) => {
      state.loading = false;
      state.error = '';
    },
    uploadError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { uploadRequest, uploadSuccess, uploadError } =
  adminProduct.actions;

export default adminProduct.reducer;
