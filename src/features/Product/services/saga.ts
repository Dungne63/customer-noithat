import { put, takeLatest } from "redux-saga/effects";
import { ProductActions } from "./slice";
import SysFetch from "@services/axios";
import { PayloadAction } from "@reduxjs/toolkit";
import qs from "qs";

export function* ProductSaga() {
  yield takeLatest(ProductActions.getProduct, getProduct);
  yield takeLatest(ProductActions.getDetailProduct, getDetailProduct);
  yield takeLatest(ProductActions.getReviewProduct, getReviewProduct);
}

export function* getProduct({
  payload: { onSuccess, pagination },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(
      `/product?${qs.stringify(pagination)}`
    );
    if (rs.statusCode === 200) {
      yield put(ProductActions.setProduct(rs.data.data));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy danh sách sản phẩm thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* getDetailProduct({
  payload: { onSuccess, productId },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(
      `/product/${productId}`
    );
    if (rs.statusCode === 200) {
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy thông tin sản phẩm thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* getReviewProduct({
  payload: { onSuccess, productId },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(
      `review/product/${productId}`
    );
    if (rs.statusCode === 200) {
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy thông tin sản phẩm thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}
