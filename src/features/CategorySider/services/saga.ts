import { put, delay, takeLatest } from "redux-saga/effects";
import { CategorySiderActions } from "./slice";
import SysFetch from "@services/axios";
import { addToast } from "@heroui/react";
import { PayloadAction } from "@reduxjs/toolkit";
import { buildCategoryTree } from "@utils/format/format_tree";

export function* CategorySiderSaga() {
  yield takeLatest(CategorySiderActions.getCategories, getCategories);
}

export function* getCategories({ payload: { onSuccess } }: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(`/category`);
    if (rs.statusCode === 200) {
      const formatToTree = buildCategoryTree(rs.data);
      yield put(CategorySiderActions.setCategories(formatToTree));
      onSuccess?.(formatToTree);
    } else throw new Error(`Lấy danh sách danh mục thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}
