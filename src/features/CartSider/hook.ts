import { useAppDispatch, useAppSelector } from "@services/store";
import { CartSiderActions, CartSiderSelectors } from "./services/slice";

export type ReceivedProps = Record<string, any>;

const useCartSider = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(CartSiderSelectors.isOpening);
  const categories = useAppSelector(CartSiderSelectors.cart);
  const onClose = () => dispatch(CartSiderActions.setIsOpening(false));

  return {
    isOpen,
    onClose,
    categories,
    ...props,
  };
};

export type Props = ReturnType<typeof useCartSider>;

export default useCartSider;
