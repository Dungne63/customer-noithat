import { FC } from "react";
import useHomeBanner, { Props, ReceivedProps } from "./hook";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import AppImage from "@components/AppImage";

const ButtonCarouselGroup = ({ next, previous, ...rest }: any) => {
  return (
    <div className="carousel-button-group">
      <div
        className="w-11 h-11 max-sm:w-7 max-sm:h-7 absolute top-1/2 left-10 max-sm:left-7 transform -translate-x-1/2 -translate-y-1/2 bg-black opacity-50 rounded-full hover:opacity-100 flex justify-center items-center transition delay-150 cursor-pointer select-none"
        onClick={() => previous?.()}
      >
        <ChevronLeftIcon className="size-7 max-sm:size-5 text-white" />
      </div>
      <div
        className="w-11 h-11 max-sm:w-7 max-sm:h-7 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 bg-black opacity-50 rounded-full hover:opacity-100 flex justify-center items-center transition delay-150 cursor-pointer select-none"
        onClick={() => next?.()}
      >
        <ChevronRightIcon className="size-7 max-sm:size-5 text-white" />
      </div>
    </div>
  );
};

const HomeBannerLayout: FC<Props> = ({ banners, responsive, navigate }) => {
  return (
    <div className="h-screen w-full">
      <Carousel
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={4000}
        customButtonGroup={<ButtonCarouselGroup />}
        dotListClass="custom-dot-list-style"
        draggable={false}
        infinite={true}
        partialVisible={false}
        responsive={responsive}
        showDots={false}
        swipeable={true}
      >
        {banners.map((oneBanner, index) => {
          return (
            <div
              key={`slide-banner-${index}`}
              className="h-screen max-md:h-[170px] cursor-pointer"
              onClick={() => {
                navigate(`/blog/${oneBanner?._id}`);
              }}
            >
              <AppImage
                alt={oneBanner.title}
                className="h-screen max-md:h-[170px] object-cover w-full rounded-none"
                src={`${oneBanner?.image}`}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

const HomeBanner: FC<ReceivedProps> = (props) => (
  <HomeBannerLayout {...useHomeBanner(props)} />
);

export default HomeBanner;
