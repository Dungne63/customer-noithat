import {
  CartSiderActions,
  CartSiderSelectors,
} from "@features/CartSider/services/slice";
import { CategorySiderActions } from "@features/CategorySider/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useLocation, useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useAppHeader = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();
  const dispatch = useAppDispatch();

  const cartLength = useAppSelector(CartSiderSelectors.cart)?.length || 0;

  const onOpenCategorySider = () => {
    dispatch(CategorySiderActions.setIsOpening(true));
  };
  const onOpenCartSider = () => {
    dispatch(CartSiderActions.setIsOpening(true));
  };

  return {
    navigate,
    currentPath,
    onOpenCategorySider,
    onOpenCartSider,
    cartLength,
    ...props,
  };
};

export type Props = ReturnType<typeof useAppHeader>;

export default useAppHeader;
