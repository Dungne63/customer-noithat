import { AppSelectors } from "@app/slice";
import {
  CartSiderActions,
  CartSiderSelectors,
} from "@features/CartSider/services/slice";
import { CategorySiderActions } from "@features/CategorySider/services/slice";
import { UserInfoActions } from "@features/UserInfo/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useLocation, useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useAppHeader = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();
  const dispatch = useAppDispatch();

  const cartLength = useAppSelector(CartSiderSelectors.cart)?.length || 0;
  const user = useAppSelector(AppSelectors.userInfo);

  const onOpenCategorySider = () => {
    dispatch(CategorySiderActions.setIsOpening(true));
  };
  const onOpenCartSider = () => {
    dispatch(CartSiderActions.setIsOpening(true));
  };

  const onOpenUserInfoModal = () => {
    dispatch(UserInfoActions.setIsOpenModalUser(true));
  };

  return {
    user,
    navigate,
    currentPath,
    onOpenCategorySider,
    onOpenCartSider,
    onOpenUserInfoModal,
    cartLength,
    ...props,
  };
};

export type Props = ReturnType<typeof useAppHeader>;

export default useAppHeader;
