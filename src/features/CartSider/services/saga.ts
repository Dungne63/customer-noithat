import { put, delay, takeLatest } from "redux-saga/effects";
import { CartSiderActions } from "./slice";
import SysFetch from "@services/axios";
import { addToast } from "@heroui/react";
import { PayloadAction } from "@reduxjs/toolkit";

export function* CartSiderSaga() {
  yield takeLatest(CartSiderActions.getCart, getCart);
}

export function* getCart({ payload: { onSuccess } }: PayloadAction<any>) {}
