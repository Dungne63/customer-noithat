import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface PaymentState {
  payment: any;
  activeVouchers: any[];
}

const initialState: PaymentState = {
  payment: null,
  activeVouchers: [],
};

export const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, { payload }) => {
      state.payment = payload;
    },
    setActiveVouchers: (state, { payload }) => {
      state.activeVouchers = payload;
    },
    createPayment: (state, { payload }) => {},
    getActiveVouchers: (state, { payload }) => {},
  },
});
const PaymentReducer = PaymentSlice.reducer;
export default PaymentReducer;
export const PaymentActions = PaymentSlice.actions;

export const PaymentSelectors = {
  payment: (state: RootState) => state.payment.payment,
  activeVouchers: (state: RootState) => state.payment.activeVouchers,
};
