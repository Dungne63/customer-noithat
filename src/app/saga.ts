import { put, delay, takeLatest } from "redux-saga/effects";
import { AppActions } from "./slice";
import SysFetch from "@services/axios";
import {
  getAccessToken,
  removeAccessToken,
  storeAccessToken,
} from "@utils/token.util";
import { addToast } from "@heroui/react";
import { PayloadAction } from "@reduxjs/toolkit";
import { SITE_NAME } from "@config/site";

export function* AppSaga() {
  yield takeLatest(AppActions.getUserInfo, getUserInfo);
  yield takeLatest(AppActions.login, login);
  yield takeLatest(AppActions.logout, logout);
  yield takeLatest(AppActions.conformOTP, conformOTP);
  yield takeLatest(AppActions.resetPassword, resetPassword);
  yield takeLatest(AppActions.updatePassword, updatePassword);
}

export function* getUserInfo({ payload: { onSuccess, onError } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: { [x: string]: any } = yield SysFetch.get(`/user/detail`);
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      onSuccess?.(rs.data.user);
    } else throw new Error(`Lấy thông tin người dùng thất bại`);
  } catch (error) {
    onError?.();
    yield put(AppActions.setIsLoading(false));
  }
}

export function* login({ payload: { onSuccess, body } }: any) {
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: { [x: string]: any } = yield SysFetch.post(`/user/login`, body);
    yield put(AppActions.setIsLoading(false));

    if (rs.statusCode === 200) {
      yield storeAccessToken(rs.data.accessToken);
      addToast({
        title: "Đăng nhập thành công",
        description: `Chào mừng bạn đến với ${SITE_NAME}`,
        color: "success",
      });
      yield put(
        AppActions.setUserInfo({
          id: null,
          email: null,
          role: "user",
        })
      );
      onSuccess?.(rs.data);
    } else {
      throw new Error(`Đăng nhập thất bại`);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

export function* logout({ payload: { onSuccess } }: any) {
  const accessToken: { [x: string]: any } = yield getAccessToken();

  if (!accessToken) return;
  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: { [x: string]: any } = yield SysFetch.post(`/user/logout`, {
      accessToken,
    });
    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 200) {
      addToast({
        title: "Đăng xuất thành công",
        description: "Hẹn gặp lại bạn sau",
        color: "success",
      });
      yield removeAccessToken();
      yield put(
        AppActions.setUserInfo({
          id: null,
          username: null,
          role: "guest",
        })
      );
      onSuccess?.(rs.data);
    }
  } catch (error) {
    yield put(AppActions.setIsLoading(false));
  }
}

function* resetPassword({ payload }: PayloadAction<any>) {
  const { email, onSuccess, action } = payload;

  try {
    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: {
      [x: string]: any;
    } = yield SysFetch.post(`user/${action}`, {
      email,
    });

    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 201) {
      onSuccess(rs.message);
    } else {
      throw rs.message || "Đăng ký thât bại";
    }
  } catch (error: any) {
    yield put(AppActions.setIsLoading(false));
  }
}

function* conformOTP({ payload }: PayloadAction<any>) {
  const { otp, email, onSuccess } = payload;
  const otpString = otp.join("");

  if (otpString.length === 6) {
    try {
      yield put(AppActions.setIsLoading(true));
      yield delay(50);
      const rs: {
        [x: string]: any;
      } = yield SysFetch.post(`user/verify-otp`, {
        email,
        otp: otpString,
      });

      yield put(AppActions.setIsLoading(false));
      if (rs.statusCode === 200) {
        onSuccess(rs?.data, rs?.message);
      } else {
        throw rs.message || "Đăng ký thât bại";
      }
    } catch (error: any) {
      yield put(AppActions.setIsLoading(false));
    }
  }
}
function* updatePassword({ payload }: PayloadAction<any>) {
  try {
    const { password, email, onSuccess } = payload;

    yield put(AppActions.setIsLoading(true));
    yield delay(50);
    const rs: {
      [x: string]: any;
    } = yield SysFetch.post(`user/register-password`, {
      password,
      email,
    });

    yield put(AppActions.setIsLoading(false));
    if (rs.statusCode === 201) {
      onSuccess(rs?.data, rs?.message);
    } else {
      throw rs.message || "Đăng ký thât bại";
    }
  } catch (error: any) {
    yield put(AppActions.setIsLoading(false));
  }
}
