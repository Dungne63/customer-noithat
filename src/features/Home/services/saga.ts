import { put, delay, takeLatest } from "redux-saga/effects";
import { HomeActions } from "./slice";
import SysFetch from "@services/axios";
import { addToast } from "@heroui/react";
import { PayloadAction } from "@reduxjs/toolkit";

export function* HomeSaga() {
  yield takeLatest(HomeActions.getBanners, getBanners);
  yield takeLatest(HomeActions.getCategories, getCategories);
  yield takeLatest(HomeActions.getProducts, getProducts);
}

export function* getBanners({ payload: { onSuccess } }: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(`/blog`);
    if (rs.statusCode === 200) {
      yield put(HomeActions.setBanners(rs.data.data));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy danh sách blog thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* getCategories({ payload: { onSuccess } }: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(`/category`);
    if (rs.statusCode === 200) {
      yield put(HomeActions.setCategories(rs.data.data));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy danh sách danh mục thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* getProducts({ payload: { onSuccess } }: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(`/product`);
    if (rs.statusCode === 200) {
      yield put(HomeActions.setProducts(rs.data.data));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy danh sách sản phẩm thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}
