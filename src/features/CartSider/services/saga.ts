import { put, delay, select, takeLatest } from "redux-saga/effects";
import { CartSiderActions, CartSiderSelectors } from "./slice";
import SysFetch from "@services/axios";
import { addToast } from "@heroui/react";
import { PayloadAction } from "@reduxjs/toolkit";

export function* CartSiderSaga() {
  yield takeLatest(CartSiderActions.getCart, getCart);
  yield takeLatest(CartSiderActions.addItemCart, addItemCart);
  yield takeLatest(
    CartSiderActions.updateQuantityItemCart,
    updateQuantityItemCart
  );
  yield takeLatest(CartSiderActions.clearCart, clearCart);
  yield takeLatest(CartSiderActions.deleteItemCart, deleteItemCart);
}

export function* getCart({ payload: { onSuccess } }: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(`/cart/my-cart`);
    if (rs.statusCode === 200) {
      yield put(CartSiderActions.setCart(rs.data.items));
      yield put(CartSiderActions.setTotal(rs.data.totalPrice));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy danh sách sản phẩm thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* addItemCart({
  payload: { onSuccess, body },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.post(`/cart/add-to-cart`, {
      items: [body],
    });
    if (rs.statusCode === 200) {
      yield put(CartSiderActions.getCart({}));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy danh sách sản phẩm thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* updateQuantityItemCart({
  payload: { onSuccess, body },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.patch(
      `/cart/update-cart`,
      body
    );
    if (rs.statusCode === 200) {
      yield put(CartSiderActions.getCart({}));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy danh sách sản phẩm thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* deleteItemCart({
  payload: { onSuccess, productId },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.delete(
      `/cart/remove-product/${productId}`
    );
    if (rs.statusCode === 200) {
      yield put(CartSiderActions.getCart({}));
      onSuccess?.(rs.data);
    } else throw new Error(`Xoá sản phẩm thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* clearCart({ payload: { onSuccess } }: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.delete(`/cart/clear-cart`);
    if (rs.statusCode === 200) {
      yield put(CartSiderActions.setCart([]));
      onSuccess?.();
    } else throw new Error(`Lấy danh sách sản phẩm thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}
