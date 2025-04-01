import { put, takeLatest } from "redux-saga/effects";
import { PaymentActions } from "./slice";
import SysFetch from "@services/axios";
import { addToast } from "@heroui/react";
import { PayloadAction } from "@reduxjs/toolkit";

export function* PaymentSaga() {
  yield takeLatest(PaymentActions.createPayment, createPayment);
  yield takeLatest(PaymentActions.getActiveVouchers, getActiveVouchers);
}

export function* createPayment({
  payload: { onSuccess, body },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.post(`/order`, body);
    if (rs.statusCode === 201) {
      yield put(PaymentActions.setPayment(null));
      addToast({
        title: "Đặt đơn thành công",
        description: `Cảm ơn bạn đã tin tưởng`,
        color: "success",
      });
      onSuccess?.(rs);
    } else throw new Error(`Đặt hàng thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* getActiveVouchers({
  payload: { onSuccess },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(`/voucher/active`);
    if (rs.statusCode === 200) {
      yield put(PaymentActions.setActiveVouchers(rs.data));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy danh sách voucher thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}
