// import { useSelector } from "react-redux";
// import { RootState } from "../store";

import { AppActions } from "@app/slice";
import { useAppDispatch } from "@services/store";
import { getAccessToken } from "@utils/token.util";
import { useEffect } from "react";

export function useAuth() {
  const dispatch = useAppDispatch();
  const isLogin = getAccessToken();

  useEffect(() => {
    if (!!isLogin) {
      dispatch(
        AppActions.getUserInfo({
          onSuccess: (data: any) =>
            dispatch(
              AppActions.setUserInfo({
                id: data._id,
                email: data.email,
                role: "user",
              })
            ),
          onError: () =>
            dispatch(
              AppActions.setUserInfo({
                id: null,
                email: null,
                role: "guest",
              })
            ),
        })
      );
    } else {
      dispatch(
        AppActions.setUserInfo({
          id: null,
          email: null,
          role: "guest",
        })
      );
    }
  }, [dispatch, isLogin]);
}
