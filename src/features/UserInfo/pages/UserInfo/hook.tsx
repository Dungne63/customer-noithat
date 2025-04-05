import { AppActions } from "@app/slice";
import { editUserSchemas } from "@features/UserInfo/schemas/editUserSchemas";
import { defaultEditUserForm } from "@features/UserInfo/services/const";
import {
  UserInfoActions,
  UserInfoSelectors,
} from "@features/UserInfo/services/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useUserInfo = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector(UserInfoSelectors.userInfo);
  const isOpen = useAppSelector(UserInfoSelectors.isOpenModalUser);
  const [addresses, setAddresses] = useState<any>([]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultEditUserForm,
    resolver: yupResolver(editUserSchemas),
  });

  const onClose = () => {
    dispatch(UserInfoActions.setIsOpenModalUser(false));
  };

  const onOpenUserAddress = () => {
    dispatch(UserInfoActions.setIsOpenModalUserAddress(true));
  };

  useEffect(() => {
    dispatch(
      UserInfoActions.getUserInfo({
        onSuccess: (data: any) => {
          reset(data);
        },
      })
    );
  }, []);

  useEffect(() => {
    setAddresses(userInfo?.address);
  }, [userInfo]);

  const onSubmit = (data: any) => {
    dispatch(UserInfoActions.updateUserInfo({ body: data }));
  };

  const onLogout = () => {
    dispatch(AppActions.logout({ onSuccess: onClose }));
  };

  return {
    onLogout,
    navigate,
    userInfo,
    isOpen,
    onClose,
    onSubmit,
    handleSubmit,
    errors,
    control,
    onOpenUserAddress,
    addresses,
    ...props,
  };
};

export type Props = ReturnType<typeof useUserInfo>;

export default useUserInfo;
