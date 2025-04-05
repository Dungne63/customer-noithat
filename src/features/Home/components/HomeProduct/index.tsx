import { FC } from "react";
import useHomeProduct, { Props, ReceivedProps } from "./hook";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import HomeLabel from "../HomeLabel";
import { Button } from "@heroui/react";
import { ROUTE_PATHS } from "@constants/route.const";
import { ProductItem } from "@components/ProductItem";

const ButtonCarouselGroup = ({ next, previous }: any) => {
  return (
    <div className="carousel-button-group">
      <div
        className="w-11 h-11 max-sm:w-7 max-sm:h-7 absolute top-1/2 left-0 max-sm:left-7 transform translate-x-1/2 -translate-y-1/2 bg-black opacity-50 rounded-full hover:opacity-100 flex justify-center items-center transition delay-150 cursor-pointer select-none"
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

const HomeProductLayout: FC<Props> = ({ products, responsive, navigate }) => {
  return (
    <div className="max-w-[1280px] w-full">
      <HomeLabel
        label="Sản phẩm nổi bật"
        right={
          <Button
            color="primary"
            variant="ghost"
            className="rounded-none"
            onPress={() => navigate(ROUTE_PATHS.PRODUCT_ALL)}
          >
            Tất cả
          </Button>
        }
      />
      <Carousel
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={4000}
        // containerClass="mx-[-16px]"
        customButtonGroup={<ButtonCarouselGroup />}
        dotListClass="custom-dot-list-style"
        draggable={false}
        infinite={true}
        // itemClass="pr-8"
        partialVisible={false}
        responsive={responsive}
        showDots={false}
        swipeable={true}
      >
        {products.map((product) => (
          <div className="col-span-4" key={product._id}>
            <ProductItem product={product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const HomeProduct: FC<ReceivedProps> = (props) => (
  <HomeProductLayout {...useHomeProduct(props)} />
);

export default HomeProduct;
