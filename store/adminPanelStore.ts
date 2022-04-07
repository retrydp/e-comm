import { createSlice } from '@reduxjs/toolkit';
import { ProductSchema, UserSchema } from '../utils/types';

type DataSchemas = ProductSchema[] | UserSchema[] | [];

interface AuthInitialState<T extends DataSchemas> {
  data: T;
  loading: boolean;
  error: string;
  loadingDelete: boolean;
  errorDelete: boolean;
  deleteErrorText: string;
}

const initialState: AuthInitialState<DataSchemas> = {
  data: [],
  loading: false,
  error: '',
  loadingDelete: false,
  errorDelete: false,
  deleteErrorText: '',
};

const adminPanelStore = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = '';
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    fetchError: (state, action) => {
      state.loading = false;
    },
    deleteRequest: (state) => {
      state.loadingDelete = true;
    },
    deleteSuccess: (state, action) => {
      state.loadingDelete = false;
      state.deleteErrorText = '';
      state.data = action.payload;
    },
    deleteError: (state, action) => {
      state.loadingDelete = false;
      state.deleteErrorText = action.payload;
    },
  },
});

export const {
  fetchRequest,
  fetchSuccess,
  fetchError,
  deleteRequest,
  deleteSuccess,
  deleteError,
} = adminPanelStore.actions;

export default adminPanelStore.reducer;
