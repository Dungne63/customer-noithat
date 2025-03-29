import { useAppDispatch, useAppSelector } from "@services/store";
import { CategorySiderActions, CategorySiderSelectors } from "./services/slice";

export type ReceivedProps = Record<string, any>;

const useCategorySider = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(CategorySiderSelectors.isOpening);
  const categories = useAppSelector(CategorySiderSelectors.categories);
  const onClose = () => dispatch(CategorySiderActions.setIsOpening(false));

  return {
    isOpen,
    onClose,
    categories,
    ...props,
  };
};

export type Props = ReturnType<typeof useCategorySider>;

export default useCategorySider;
