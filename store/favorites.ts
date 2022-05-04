import { createSlice } from '@reduxjs/toolkit';
import { ProductSchema } from '../utils/types';

interface FavoritesInitialState {
  favoritesData: ProductSchema[];
  favoritesLoading: boolean;
}

const initialState: FavoritesInitialState = {
  favoritesData: [],
  favoritesLoading: false,
};

const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    favoritesFetch: (state, action) => {
      const favorites = action.payload;
      state.favoritesData = favorites;
    },
    favoritesSetLoading: (state, action) => {
      state.favoritesLoading = action.payload;
    },
    favoritesDelete: (state, action) => {
      const slug = action.payload;
      state.favoritesData = state.favoritesData.filter(
        (item) => item.slug !== slug
      );
    },
  },
});

export const { favoritesFetch, favoritesSetLoading, favoritesDelete } =
  favorites.actions;

export default favorites.reducer;
