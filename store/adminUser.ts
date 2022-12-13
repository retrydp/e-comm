import { createSlice } from '@reduxjs/toolkit';

interface ApInitialState {
  adminUserLoading: boolean;
  adminUserErrorText: string;
}

const initialState: ApInitialState = {
  adminUserLoading: false,
  adminUserErrorText: '',
};

const adminUser = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    adminUserEditRequest: (state) => {
      state.adminUserLoading = true;
      state.adminUserErrorText = '';
    },
    adminUserEditSuccess: (state) => {
      state.adminUserLoading = false;
      state.adminUserErrorText = '';
    },

    adminUserEditError: (state, action) => {
      state.adminUserLoading = false;
      state.adminUserErrorText = action.payload;
    },
  },
});

export const {
  adminUserEditRequest,
  adminUserEditSuccess,
  adminUserEditError,
} = adminUser.actions;

export default adminUser.reducer;
