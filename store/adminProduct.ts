import { createSlice } from '@reduxjs/toolkit';
interface ApInitialState {
  loading: boolean;
  loadingAdd: boolean;
  errorText: string;
  errorAdd: string;
}

const initialState: ApInitialState = {
  loading: false,
  loadingAdd: false,
  errorText: '',
  errorAdd: '',
};

const adminProduct = createSlice({
  name: 'adminProduct',
  initialState,
  reducers: {
    uploadRequest: (state) => {
      state.loading = true;
      state.errorText = '';
    },
    uploadSuccess: (state) => {
      state.loading = false;
      state.errorText = '';
    },

    uploadError: (state, action) => {
      state.loading = false;
      state.errorText = action.payload;
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
