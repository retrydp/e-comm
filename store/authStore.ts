import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
interface AuthInitialState {
  userInfo: {
    token: string;
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

const initialState: AuthInitialState = {
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo') || '')
    : null,
};

const authStore = createSlice({
  name: 'authStore',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { userLogin } = authStore.actions;

export default authStore.reducer;
