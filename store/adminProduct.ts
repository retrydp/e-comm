import { createSlice } from '@reduxjs/toolkit';

interface ApInitialState {
  loading: boolean;
  loadingAdd: boolean;
  error: string;
  errorAdd: string;
}

const initialState: ApInitialState = {
  loading: false,
  loadingAdd: false,
  error: '',
  errorAdd: '',
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
    addRequest: (state) => {
      state.loadingAdd = true;
      state.errorAdd = '';
    },
    addSuccess: (state) => {
      state.loadingAdd = false;
      state.errorAdd = '';
    },
    addError: (state, action) => {
      state.loadingAdd = false;
      state.errorAdd = action.payload;
    },
  },
});

export const {
  uploadRequest,
  uploadSuccess,
  uploadError,
  addError,
  addSuccess,
  addRequest,
} = adminProduct.actions;

export default adminProduct.reducer;
