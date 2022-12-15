import { createSlice } from '@reduxjs/toolkit';

interface ApInitialState {
  adminProductLoading: boolean;
  adminProductLoadingAdd: boolean;
  adminProductErrorText: string;
  adminProductErrorAdd: string;
}

const initialState: ApInitialState = {
  adminProductLoading: false,
  adminProductLoadingAdd: false,
  adminProductErrorText: '',
  adminProductErrorAdd: '',
};

const adminProduct = createSlice({
  name: 'adminProduct',
  initialState,
  reducers: {
    adminProductUploadRequest: (state) => {
      state.adminProductLoading = true;
      state.adminProductErrorText = '';
    },
    adminProductUploadSuccess: (state) => {
      state.adminProductLoading = false;
      state.adminProductErrorText = '';
    },

    adminProductUploadError: (state, action) => {
      state.adminProductLoading = false;
      state.adminProductErrorText = action.payload;
    },
    adminProductAddRequest: (state) => {
      state.adminProductLoadingAdd = true;
      state.adminProductErrorAdd = '';
    },
    adminProductAddSuccess: (state) => {
      state.adminProductLoadingAdd = false;
      state.adminProductErrorAdd = '';
    },
    adminProductAddError: (state, action) => {
      state.adminProductLoadingAdd = false;
      state.adminProductErrorAdd = action.payload;
    },
  },
});

export const {
  adminProductUploadRequest,
  adminProductUploadSuccess,
  adminProductUploadError,
  adminProductAddError,
  adminProductAddSuccess,
  adminProductAddRequest,
} = adminProduct.actions;

export default adminProduct.reducer;
