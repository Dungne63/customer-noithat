import { put, takeLatest } from "redux-saga/effects";
import { OrderActions } from "./slice";
import SysFetch from "@services/axios";
import { addToast } from "@heroui/react";
import { PayloadAction } from "@reduxjs/toolkit";
import qs from "qs";

export function* OrderSaga() {
  yield takeLatest(OrderActions.getOrder, getOrder);
  yield takeLatest(OrderActions.confirmReceived, confirmReceived);
  yield takeLatest(OrderActions.confirmCancelled, confirmCancelled);
  yield takeLatest(OrderActions.sendReviews, sendReviews);
}

export function* getOrder({
  payload: { onSuccess, pagination },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(
      `/order/?${qs.stringify(pagination)}`
    );
    if (rs.statusCode === 200) {
      yield put(OrderActions.setOrder(rs.data.data));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy danh sách đơn hàng thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* confirmReceived({
  payload: { onSuccess, orderId },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.put(
      `/order/${orderId}/receive`
    );
    if (rs.statusCode === 200) {
      addToast({
        title: "Xác nhận thành công",
        description: `Xác nhận đã nhận được hàng`,
        color: "success",
      });
      onSuccess?.();
    } else throw new Error(`Thao tác thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* confirmCancelled({
  payload: { onSuccess, orderId },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.put(
      `/order/${orderId}/cancel`
    );
    if (rs.statusCode === 200) {
      addToast({
        title: "Huỷ thành công",
        description: `Xác nhận đã huỷ đơn hàng`,
        color: "success",
      });
      onSuccess?.();
    } else throw new Error(`Thao tác thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* sendReviews({
  payload: { onSuccess, body },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.post(`/review`, body);
    if (rs.statusCode === 200) {
      addToast({
        title: "Đánh giá thành công",
        description: `Đánh giá của bạn đã được gửi`,
        color: "success",
      });
      onSuccess?.();
    } else throw new Error(`Thao tác thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}
