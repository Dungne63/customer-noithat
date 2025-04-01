import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/services/store";

interface UserInfoState {
  userInfo: any;
  userAddress: any;
  isOpenModalUser: boolean;
  isOpenModalUserAddress: boolean;
}

const initialState: UserInfoState = {
  userInfo: {},
  userAddress: [],
  isOpenModalUser: false,
  isOpenModalUserAddress: false,
};

export const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserInfo: (state, { payload }) => {},
    updateUserInfo: (state, { payload }) => {},
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    getUserAddress: (state, { payload }) => {},
    updateUserAddress: (state, { payload }) => {},
    setUserAddress: (state, { payload }) => {
      state.userAddress = payload;
    },
    setIsOpenModalUser: (state, { payload }) => {
      state.isOpenModalUser = payload;
    },
    setIsOpenModalUserAddress: (state, { payload }) => {
      state.isOpenModalUserAddress = payload;
    },
    getProvinces: (state, { payload }) => {},
    getDistricts: (state, { payload }) => {},
    getWards: (state, { payload }) => {},
  },
});
const UserInfoReducer = UserInfoSlice.reducer;
export default UserInfoReducer;
export const UserInfoActions = UserInfoSlice.actions;

export const UserInfoSelectors = {
  userInfo: (state: RootState) => state.userInfo.userInfo,
  userAddress: (state: RootState) => state.userInfo.userAddress,
  isOpenModalUser: (state: RootState) => state.userInfo.isOpenModalUser,
  isOpenModalUserAddress: (state: RootState) =>
    state.userInfo.isOpenModalUserAddress,
};
