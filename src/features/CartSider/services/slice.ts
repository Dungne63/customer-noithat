import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface CartSiderState {
  isOpening: boolean;
  cart: any[];
}

const initialState: CartSiderState = {
  isOpening: false,
  cart: [],
};

export const CartSiderSlice = createSlice({
  name: "cartSider",
  initialState,
  reducers: {
    setIsOpening: (state, { payload }) => {
      state.isOpening = payload;
    },
    getCart: (state, { payload }) => {},
    setCart: (state, { payload }) => {
      state.cart = payload;
    },
  },
});
const CartSiderReducer = CartSiderSlice.reducer;
export default CartSiderReducer;
export const CartSiderActions = CartSiderSlice.actions;

export const CartSiderSelectors = {
  isOpening: (state: RootState) => state.cartSider.isOpening,
  cart: (state: RootState) => state.cartSider.cart,
};
