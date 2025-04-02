import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface OrderState {
  orders: any[];
}

const initialState: OrderState = {
  orders: [],
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, { payload }) => {
      state.orders = payload;
    },
    getOrder: (state, { payload }) => {},
    confirmReceived: (state, { payload }) => {},
    confirmCancelled: (state, { payload }) => {},
    sendReviews: (state, { payload }) => {},
  },
});
const OrderReducer = OrderSlice.reducer;
export default OrderReducer;
export const OrderActions = OrderSlice.actions;

export const OrderSelectors = {
  orders: (state: RootState) => state.order.orders,
};
