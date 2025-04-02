import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface ProductState {
  products: any;
}

const initialState: ProductState = {
  products: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state, { payload }) => {},
    getDetailProduct: (state, { payload }) => {},
    setProduct: (state, { payload }) => {
      state.products = payload;
    },
    getReviewProduct: (state, { payload }) => {},
  },
});
const ProductReducer = ProductSlice.reducer;
export default ProductReducer;
export const ProductActions = ProductSlice.actions;

export const ProductSelectors = {
  products: (state: RootState) => state.product.products,
};
