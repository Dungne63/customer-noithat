import { HomeActions, HomeSelectors } from "@features/Home/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useHomeBestSeller = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector(HomeSelectors.products);

  useEffect(() => {
    dispatch(HomeActions.getProducts({}));
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 200 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
  };

  return {
    navigate,
    products,
    responsive,
    ...props,
  };
};

export type Props = ReturnType<typeof useHomeBestSeller>;

export default useHomeBestSeller;
