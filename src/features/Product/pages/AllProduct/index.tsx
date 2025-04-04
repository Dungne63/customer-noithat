import { FC, useMemo } from "react";
import useProductAll, { Props, ReceivedProps } from "./hook";
import AppImage from "@components/AppImage";
import formatVND from "@utils/format/format-vnd";
import { Button, Pagination } from "@heroui/react";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { ProductItem } from "@components/ProductItem";

const ProductAllLayout: FC<Props> = ({
  products,
  pagination,
  onChangePagination,
}) => {
  const renderPagination = useMemo(() => {
    return (
      pagination?.totalPages > 1 && (
        <div className="flex w-full justify-center mb-20">
          <Pagination
            showControls
            page={pagination?.page}
            total={pagination?.totalPages}
            onChange={(page) => onChangePagination?.(page)}
          />
        </div>
      )
    );
  }, [pagination, onChangePagination]);

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-[1280px]">
        <div className="grid grid-cols-12 w-full gap-1 mb-8">
          {products.map((item: any) => {
            return (
              <div className="col-span-4" key={item._id}>
                <ProductItem product={item} />
              </div>
            );
          })}
        </div>
        {renderPagination}
      </div>
    </div>
  );
};

const ProductAll: FC<ReceivedProps> = (props) => (
  <ProductAllLayout {...useProductAll(props)} />
);

export default ProductAll;
