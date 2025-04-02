import { FC } from "react";
import useProductDetail, { Props, ReceivedProps } from "./hook";
import AppImage from "@components/AppImage";
import formatVND from "@utils/format/format-vnd";
import { Button, Tab, Tabs } from "@heroui/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { handleDate, handleParseDate } from "@utils/format/format-time";
import moment from "moment";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const ProductDetailLayout: FC<Props> = ({
  productDetail,
  showingImage,
  setShowingImage,
  reviews,
  reviewPagination,
  setReviewPagination,
  addToCart,
}) => {
  return (
    <div className="flex w-full justify-center pt-8">
      {productDetail && (
        <div className="max-w-[1280px] w-full h-full bg-white p-8 shadow-lg">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-5">
              <div className="grid grid-cols-5 gap-4 border-2 p-6">
                <AppImage
                  src={showingImage}
                  className="col-span-5 object-cover aspect-square shadow-xl"
                />
                {productDetail.images.map((item: string) => (
                  <div
                    key={item}
                    className={`w-full shadow-2xl col-span-1 bg-black  ${
                      showingImage != item &&
                      "cursor-pointer hover:scale-105 duration-300"
                    }`}
                    onClick={() => setShowingImage(item)}
                  >
                    <AppImage
                      src={item}
                      className={`object-cover aspect-square ${
                        showingImage == item && "opacity-50"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-7">
              <div className="text-2xl font-semibold mb-2">
                {productDetail.name}
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-lg font-semibold text-danger">
                  {formatVND(productDetail.price)}
                </div>
                <div className="text-lg flex gap-2 items-center">
                  <span className="font-semibold">Chất liệu:</span>
                  <div className="select-none border-1 px-2 py-1 text-sm">
                    {productDetail.material}
                  </div>
                </div>
                <div className="text-lg flex gap-2 items-center">
                  <span className="font-semibold">Kích cỡ:</span>
                  <div className="select-none border-1 px-2 py-1 text-sm">
                    {productDetail.size}
                  </div>
                </div>
                <div className="">
                  <span className="">mã kho: </span>
                  {productDetail.sku}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="">danh mục sản phẩm:</span>
                  {productDetail?.categories?.map((itemCate: any) => (
                    <div
                      className="select-none border-1 px-2 py-1 text-sm"
                      key={itemCate._id}
                    >
                      {itemCate.name}
                    </div>
                  ))}
                </div>
                <div className="">
                  Còn:
                  <span className="font-semibold">
                    {" "}
                    {productDetail.quantity}{" "}
                  </span>
                  sản phẩm
                </div>
              </div>
              <div className="flex mt-4 gap-6 duration-200 ease-in max-w-[550px]">
                <Button
                  className="rounded-none w-full"
                  color="primary"
                  onPress={() => addToCart(productDetail)}
                >
                  Thêm vào giỏ
                  <ShoppingBagIcon className="size-5" />
                </Button>
                <Button className="rounded-none w-full" color="secondary">
                  Mua
                  <ShoppingCartIcon className="size-5" />
                </Button>
              </div>
              <div className="mt-4 max-w-[550px]">
                <Tabs
                  aria-label="Tabs variants"
                  variant={"underlined"}
                  size="lg"
                  classNames={{ tab: "pl-0" }}
                >
                  <Tab title="Đánh giá">
                    <div className="p-2 border-2 min-h-[100px]">
                      {reviews?.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {reviews.map((reviewItem: any) => (
                            <div
                              className="flex flex-col gap-1 text-sm select-none"
                              key={reviewItem._id}
                            >
                              <div className="">
                                {reviewItem?.fullName
                                  ? reviewItem?.fullName
                                  : "Người dùng " + reviewItem.userId}
                              </div>
                              <Rating
                                value={reviewItem?.rating}
                                readOnly
                                className="max-w-[70px] mb-1"
                              />
                              <div className="pl-2">{reviewItem?.comment}</div>
                              <div>
                                lúc{" "}
                                {moment(reviewItem.createdAt).format(
                                  "HH:mm:ss DD-MM-YYYY"
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>Chưa có dánh giá</div>
                      )}
                    </div>
                  </Tab>
                  <Tab title="Chính sách bảo hành">
                    <div className="p-2 border-2 min-h-[100px]">
                      <div>{productDetail.warranty}</div>
                    </div>
                  </Tab>
                  <Tab title="Thông tin vận chuyển">
                    <div className="p-2 border-2 min-h-[100px]">
                      <div>{productDetail.shippingInfo}</div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductDetail: FC<ReceivedProps> = (props) => (
  <ProductDetailLayout {...useProductDetail(props)} />
);

export default ProductDetail;
