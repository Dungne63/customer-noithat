import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface HomeState {
  banners: any[];
  categories: any[];
  products: any[];
}

const initialState: HomeState = {
  banners: [],
  categories: [],
  products: [],
};

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getBanners: (state, { payload }) => {},
    setBanners: (state, { payload }) => {
      state.banners = payload;
    },
    getCategories: (state, { payload }) => {},
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
    getProducts: (state, { payload }) => {},
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
  },
});
const HomeReducer = HomeSlice.reducer;
export default HomeReducer;
export const HomeActions = HomeSlice.actions;

export const HomeSelectors = {
  banners: (state: RootState) => state.home.banners,
  categories: (state: RootState) => state.home.categories,
  products: (state: RootState) => state.home.products,
};
