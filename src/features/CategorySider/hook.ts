import { useAppDispatch, useAppSelector } from "@services/store";
import { CategorySiderActions, CategorySiderSelectors } from "./services/slice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useCategorySider = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector(CategorySiderSelectors.isOpening);
  const categories = useAppSelector(CategorySiderSelectors.categories);
  const onClose = () => dispatch(CategorySiderActions.setIsOpening(false));

  useEffect(() => {
    dispatch(CategorySiderActions.getCategories({}));
  }, []);

  return {
    navigate,
    isOpen,
    onClose,
    categories,
    ...props,
  };
};

export type Props = ReturnType<typeof useCategorySider>;

export default useCategorySider;
