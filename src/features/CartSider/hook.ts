import { useAppDispatch, useAppSelector } from "@services/store";
import { CartSiderActions, CartSiderSelectors } from "./services/slice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export type ReceivedProps = Record<string, any>;

const useCartSider = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector(CartSiderSelectors.isOpening);
  const cart = useAppSelector(CartSiderSelectors.cart);
  const total = useAppSelector(CartSiderSelectors.total);
  const onClose = () => dispatch(CartSiderActions.setIsOpening(false));

  const onClearCart = () => dispatch(CartSiderActions.clearCart({}));
  const onRemoveItem = (productId: string) =>
    dispatch(CartSiderActions.deleteItemCart({ productId }));
  const onUpdateQuantityItemCart = (productId: string, quantity: number) =>
    dispatch(
      CartSiderActions.updateQuantityItemCart({ body: { productId, quantity } })
    );

  useEffect(() => {
    dispatch(CartSiderActions.getCart({}));
  }, []);

  return {
    onUpdateQuantityItemCart,
    total,
    onClearCart,
    isOpen,
    onClose,
    navigate,
    onRemoveItem,
    cart,
    ...props,
  };
};

export type Props = ReturnType<typeof useCartSider>;

export default useCartSider;
