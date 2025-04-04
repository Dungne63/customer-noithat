import { useAppDispatch, useAppSelector } from "@services/store";
import { CategorySiderActions, CategorySiderSelectors } from "./services/slice";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "@constants/route.const";
import qs from "qs";

export type ReceivedProps = Record<string, any>;

const useCategorySider = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector(CategorySiderSelectors.isOpening);
  const categories = useAppSelector(CategorySiderSelectors.categories);
  const onClose = () => dispatch(CategorySiderActions.setIsOpening(false));

  const navigateWithQueryURL = (productName: string) => {
    navigate(
      `${ROUTE_PATHS.PRODUCT_ALL}?${qs.stringify({ search: productName })}`
    );
  };

  useEffect(() => {
    dispatch(CategorySiderActions.getCategories({}));
  }, []);

  return {
    navigateWithQueryURL,
    isOpen,
    onClose,
    categories,
    ...props,
  };
};

export type Props = ReturnType<typeof useCategorySider>;

export default useCategorySider;
