import { createSlice } from '@reduxjs/toolkit';

export interface CurrentActiveTab {
  activeTab: string;
}
const initialState: CurrentActiveTab = {
  activeTab: '',
};

const currentActiveTab = createSlice({
  name: 'currentTab',
  initialState,
  reducers: {
    change: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { change } = currentActiveTab.actions;
export default currentActiveTab.reducer;
