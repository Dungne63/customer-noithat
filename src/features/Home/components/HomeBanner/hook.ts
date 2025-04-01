import { HomeActions, HomeSelectors } from "@features/Home/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useHomeBanner = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const banners = useAppSelector(HomeSelectors.banners);

  useEffect(() => {
    dispatch(HomeActions.getBanners({}));
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 200 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return {
    navigate,
    banners,
    responsive,
    ...props,
  };
};

export type Props = ReturnType<typeof useHomeBanner>;

export default useHomeBanner;
