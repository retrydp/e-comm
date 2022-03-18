import { createSlice } from '@reduxjs/toolkit';

import { ProductSchema, UserSchema } from '../utils/types';

interface AuthInitialState {
  data: ProductSchema[] | UserSchema[] | [];
  loading: boolean;
  error: string;
}

const initialState: AuthInitialState = {
  data: [],
  loading: true,
  error: '',
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
      state.error = action.payload;
    },
  },
});

export const { fetchRequest, fetchSuccess, fetchError } =
  adminPanelStore.actions;

export default adminPanelStore.reducer;
