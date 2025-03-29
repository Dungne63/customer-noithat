import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface CategorySiderState {
  isOpening: boolean;
  categories: any[];
}

const initialState: CategorySiderState = {
  isOpening: false,
  categories: [],
};

export const CategorySiderSlice = createSlice({
  name: "categorySider",
  initialState,
  reducers: {
    setIsOpening: (state, { payload }) => {
      state.isOpening = payload;
    },
    getCategories: (state, { payload }) => {},
    setCategories: (state, { payload }) => {
      state.categories = payload;
    },
  },
});
const CategorySiderReducer = CategorySiderSlice.reducer;
export default CategorySiderReducer;
export const CategorySiderActions = CategorySiderSlice.actions;

export const CategorySiderSelectors = {
  isOpening: (state: RootState) => state.categorySider.isOpening,
  categories: (state: RootState) => state.categorySider.categories,
};
