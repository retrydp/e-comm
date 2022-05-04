import { createSlice } from '@reduxjs/toolkit';
import { ProductSchema, UserSchema } from '../utils/types';

type DataSchemas = ProductSchema[] | UserSchema[] | [];

interface AuthInitialState<T extends DataSchemas> {
  adminPanelData: T;
  adminPanelLoading: boolean;
  adminPanelError: string;
  adminPanelLoadingDelete: boolean;
  adminPanelErrorDelete: boolean;
  adminPanelDeleteErrorText: string;
}

const initialState: AuthInitialState<DataSchemas> = {
  adminPanelData: [],
  adminPanelLoading: false,
  adminPanelError: '',
  adminPanelLoadingDelete: false,
  adminPanelErrorDelete: false,
  adminPanelDeleteErrorText: '',
};

const adminPanelStore = createSlice({
  name: 'adminPanelStore',
  initialState,
  reducers: {
    adminPanelFetchRequest: (state) => {
      state.adminPanelLoading = true;
      state.adminPanelError = '';
    },
    adminPanelFetchSuccess: (state, action) => {
      state.adminPanelLoading = false;
      state.adminPanelData = action.payload;
      state.adminPanelError = '';
    },
    adminPanelFetchError: (state, action) => {
      state.adminPanelLoading = false;
      state.adminPanelError = action.payload;
    },
    adminPanelDeleteRequest: (state) => {
      state.adminPanelLoadingDelete = true;
    },
    adminPanelDeleteSuccess: (state, action) => {
      state.adminPanelLoadingDelete = false;
      state.adminPanelDeleteErrorText = '';
      state.adminPanelData = action.payload;
    },
    adminPanelDeleteError: (state, action) => {
      state.adminPanelLoadingDelete = false;
      state.adminPanelDeleteErrorText = action.payload;
    },
  },
});

export const {
  adminPanelFetchRequest,
  adminPanelFetchSuccess,
  adminPanelFetchError,
  adminPanelDeleteRequest,
  adminPanelDeleteSuccess,
  adminPanelDeleteError,
} = adminPanelStore.actions;

export default adminPanelStore.reducer;
