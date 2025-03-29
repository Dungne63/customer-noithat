import { put, delay, takeLatest } from "redux-saga/effects";
import { CategorySiderActions } from "./slice";
import SysFetch from "@services/axios";
import { addToast } from "@heroui/react";
import { PayloadAction } from "@reduxjs/toolkit";

export function* CategorySiderSaga() {
  yield takeLatest(CategorySiderActions.getCategories, getCategories);
}

export function* getCategories({
  payload: { onSuccess },
}: PayloadAction<any>) {}
