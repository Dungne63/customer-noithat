import { FC, useMemo } from "react";
import useOrder, { Props, ReceivedProps } from "./hook";
import moment from "moment";
import { ClockIcon } from "@heroicons/react/24/outline";
import AppImage from "@components/AppImage";
import formatVND from "@utils/format/format-vnd";
import { Button, Pagination } from "@heroui/react";
import Review from "./components/review";

const OrderLayout: FC<Props> = ({
  orders,
  orderStatus,
  pagination,
  onChangePagination,
  confirmReceived,
  confirmCancelled,
  reviewingOrder,
  setReviewingOrder,
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
    <div className="flex justify-center my-8">
      <div className="max-w-[1280px] w-full h-full">
        {orders.length ? (
          <div className="flex flex-col gap-4">
            {orders.map((orderItem) => {
              return (
                <div
                  className="flex flex-col gap-2 bg-white p-8 shadow-lg"
                  key={orderItem._id}
                >
                  <div className="text-gray-600 text-md flex items-center border-b-2 pb-2 justify-between select-none">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="size-5" />
                      {moment(orderItem.createdAt).format(
                        "HH:mm:ss DD-MM-YYYY"
                      )}
                    </div>
                    <div
                      className={`text-${
                        orderStatus[orderItem.status as string].color
                      }`}
                    >
                      {orderStatus[orderItem.status as string].label}
                    </div>
                  </div>
                  <div className="border-b-2 pb-4">
                    <div className="text-lg pb-2">Sản phẩm đã đặt</div>
                    <div className="flex flex-col gap-2 px-2">
                      {orderItem?.items?.map(({ productId, quantity }: any) => (
                        <div
                          className="flex items-center gap-4 justify-between"
                          key={productId._id}
                        >
                          <div className="flex items-center gap-4 w-[300px]">
                            <AppImage
                              src={productId.images[0]}
                              className="w-[150px] h-[100px] object-cover rounded-2xl border-1 shadow-md"
                            />
                            <div>{productId.name}</div>
                          </div>

                          <div className="flex items-center justify-center gap-4">
                            <div className="text-start w-[180px]">
                              <span>giá:</span>{" "}
                              <span className="">
                                {formatVND(productId.price)}
                              </span>
                            </div>
                            <div className="mr-[30px] font-semibold">x</div>
                            <div className="text-start w-[160px]">
                              Số lượng:{" "}
                              <span className="text-primary font-semibold">
                                {quantity}
                              </span>
                            </div>
                          </div>
                          <div className="text-end w-[200px] font-semibold">
                            Tổng: {formatVND(quantity * productId.price)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-b-2 text-lg pt-2 pb-4 font-semibold text-right">
                    Thanh toán: {formatVND(orderItem.totalPrice)}
                  </div>
                  <div className="border-b-2 text-lg pt-2 pb-4 text-right">
                    Phương thức thanh toán: {orderItem.paymentMethod}
                  </div>
                  <div className="border-b-2 text-lg pt-2 pb-4 text-right last:border-none">
                    Địa chỉ nhận hàng: {orderItem.shippingAddress}
                  </div>
                  {orderItem.status === "shipping" && (
                    <div className="text-right">
                      <Button
                        color="primary"
                        className="rounded-none"
                        onPress={() => confirmReceived(orderItem._id)}
                      >
                        Xác nhận đã nhận hàng
                      </Button>
                    </div>
                  )}
                  {orderItem.status === "pending" && (
                    <div className="text-right">
                      <Button
                        color="danger"
                        className="rounded-none"
                        onPress={() => confirmCancelled(orderItem._id)}
                      >
                        Huỷ đơn hàng
                      </Button>
                    </div>
                  )}
                  {orderItem.status === "completed" && (
                    <div className="text-right">
                      <Button
                        color="success"
                        className="rounded-none text-white"
                        onPress={() => setReviewingOrder(orderItem)}
                      >
                        Đánh giá
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
            {renderPagination}
          </div>
        ) : (
          <div>Chưa có đơn hàng nào</div>
        )}
      </div>
      <Review
        reviewingOrder={reviewingOrder}
        setReviewingOrder={setReviewingOrder}
      />
    </div>
  );
};

const Order: FC<ReceivedProps> = (props) => (
  <OrderLayout {...useOrder(props)} />
);

export default Order;
