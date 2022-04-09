import { createSlice } from '@reduxjs/toolkit';
interface ApInitialState {
  loading: boolean;
  errorText: string;
}

const initialState: ApInitialState = {
  loading: false,
  errorText: '',
};

const adminUser = createSlice({
  name: 'adminUser',
  initialState,
  reducers: {
    editRequest: (state) => {
      state.loading = true;
      state.errorText = '';
    },
    editSuccess: (state) => {
      state.loading = false;
      state.errorText = '';
    },

    editError: (state, action) => {
      state.loading = false;
      state.errorText = action.payload;
    },
  },
});

export const { editRequest, editSuccess, editError } = adminUser.actions;

export default adminUser.reducer;
