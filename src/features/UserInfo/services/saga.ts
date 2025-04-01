import { put, delay, takeLatest } from "redux-saga/effects";
import { UserInfoActions } from "./slice";
import SysFetch from "@services/axios";
import { addToast } from "@heroui/react";
import { PayloadAction } from "@reduxjs/toolkit";

export function* UserInfoSaga() {
  yield takeLatest(UserInfoActions.getUserInfo, getUserInfo);
  yield takeLatest(UserInfoActions.updateUserInfo, updateUserInfo);
  yield takeLatest(UserInfoActions.getUserAddress, getUserAddress);
  yield takeLatest(UserInfoActions.updateUserAddress, updateUserAddress);
  yield takeLatest(UserInfoActions.getProvinces, getProvinces);
  yield takeLatest(UserInfoActions.getDistricts, getDistricts);
  yield takeLatest(UserInfoActions.getWards, getWards);
}

export function* getUserInfo({ payload: { onSuccess } }: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(`/user-info/user`);
    if (rs.statusCode === 200) {
      yield put(UserInfoActions.setUserInfo(rs.data));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy thông tin thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* updateUserInfo({
  payload: { onSuccess, body },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.put(`/user-info`, body);
    if (rs.statusCode === 200) {
      yield put(UserInfoActions.getUserInfo({}));
      addToast({
        title: "Hoàn thành cập nhật",
        description: `Cập nhât thông tin cá nhân thành công`,
        color: "success",
      });
      onSuccess?.(rs.data);
    } else throw new Error(`Cập nhật thông tin thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* getProvinces({ payload: { onSuccess } }: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(`/location/provinces`);
    if (Array.isArray(rs)) {
      onSuccess?.(rs);
    } else throw new Error(`Lấy danh sách Tỉnh thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* getDistricts({
  payload: { onSuccess, provinceCode },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(
      `/location/districts/${provinceCode}`
    );
    if (Array.isArray(rs)) {
      onSuccess?.(rs);
    } else throw new Error(`Lấy danh sách Quận/Huyện thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* getWards({
  payload: { onSuccess, districtCode },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(
      `/location/wards/${districtCode}`
    );
    if (Array.isArray(rs)) {
      onSuccess?.(rs);
    } else throw new Error(`Lấy danh sách Xã/Phường thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* updateUserAddress({
  payload: { onSuccess, body },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.post(
      `/user-info/update/address`,
      body
    );
    if (rs.statusCode === 201) {
      yield put(UserInfoActions.getUserAddress({}));
      yield put(UserInfoActions.getUserInfo({}));
      addToast({
        title: "Hoàn thành cập nhật",
        description: `Cập nhât thông tin địa chỉ thành công`,
        color: "success",
      });
      onSuccess?.(rs);
    } else throw new Error(`Cập nhật thông tin thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}

export function* getUserAddress({
  payload: { onSuccess },
}: PayloadAction<any>) {
  try {
    const rs: { [x: string]: any } = yield SysFetch.get(
      `/user-info/user-information/address`
    );
    if (rs.statusCode === 200) {
      yield put(UserInfoActions.setUserAddress(rs.data));
      onSuccess?.(rs.data);
    } else throw new Error(`Lấy thông tin thất bại`);
  } catch (error) {
    console.log("error", error);
  }
}
