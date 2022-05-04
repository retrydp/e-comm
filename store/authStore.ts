import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
export interface AuthInitialState {
  userInfo: {
    token: string;
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null;
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
    userLogout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { userLogin, userLogout } = authStore.actions;

export default authStore.reducer;
