import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface CartSiderState {
  isOpening: boolean;
  cart: any[];
  total: number;
}

const initialState: CartSiderState = {
  isOpening: false,
  cart: [],
  total: 0,
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
    setTotal: (state, { payload }) => {
      state.total = payload;
    },
    addItemCart: (state, { payload }) => {},
    updateQuantityItemCart: (state, { payload }) => {},
    deleteItemCart: (state, { payload }) => {},
    clearCart: (state, { payload }) => {},
  },
});
const CartSiderReducer = CartSiderSlice.reducer;
export default CartSiderReducer;
export const CartSiderActions = CartSiderSlice.actions;

export const CartSiderSelectors = {
  isOpening: (state: RootState) => state.cartSider.isOpening,
  cart: (state: RootState) => state.cartSider.cart,
  total: (state: RootState) => state.cartSider.total,
};
