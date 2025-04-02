import { FC } from "react";
import useReview, { Props, ReceivedProps } from "./hook";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import AppImage from "@components/AppImage";
import formatVND from "@utils/format/format-vnd";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ReviewLayout: FC<Props> = ({
  reviewingOrder,
  setReviewingOrder,
  reviews,
  setReviews,
  onSendReview,
}) => {
  return (
    <Modal
      isOpen={!!reviewingOrder}
      onClose={() => setReviewingOrder(null)}
      className="rounded-none"
      size="xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Đánh giá sản phẩm
            </ModalHeader>
            <ModalBody>
              {reviewingOrder?.items?.length > 0 ? (
                reviewingOrder?.items?.map(
                  ({ productId, quantity }: any, index: number) => (
                    <div
                      key={productId._id}
                      className="border-2 p-4 flex flex-col gap-4"
                    >
                      <div className="flex gap-4 justify-between items-center">
                        <div className="flex gap-4">
                          <AppImage
                            src={productId.images[0]}
                            className="w-[120px] h-[80px] object-cover"
                          />
                          <div>
                            <div className="">{productId.name}</div>
                            <div className="text-sm">
                              {formatVND(productId.price)}
                            </div>
                            <div className="flex gap-2 items-center justify-end flex-wrap text-xs mt-1">
                              <div className="bg-gray-200 py-1 rounded flex justify-center items-center px-3 shadow-2xl">
                                {productId.size}
                              </div>
                              <div className="bg-gray-200 py-1 rounded flex justify-center items-center px-3 shadow-2xl">
                                {productId.material}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="place-items-end">
                          đã mua:{" "}
                          <span className="font-semibold">{quantity}</span>
                        </div>
                      </div>
                      {reviews?.length > 0 && (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center">
                            <div className="w-[100px]">Bình luận:</div>
                            <Input
                              variant="underlined"
                              size="sm"
                              classNames={{ inputWrapper: "rounded-none" }}
                              value={reviews[index].comment}
                              onValueChange={(e) =>
                                setReviews((prev: any) =>
                                  [...prev].map((itemR, indexR) =>
                                    indexR === index
                                      ? { ...itemR, comment: e }
                                      : itemR
                                  )
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center">
                            <div className="w-[100px]">Đánh giá:</div>
                            <div className="w-full">
                              <Rating
                                value={reviews[index].rating}
                                onChange={(e: number) =>
                                  setReviews((prev: any) =>
                                    [...prev].map((itemR, indexR) =>
                                      indexR === index
                                        ? { ...itemR, rating: e }
                                        : itemR
                                    )
                                  )
                                }
                                className="max-w-[120px] mb-1"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )
              ) : (
                <div>Không có sản phẩm nào để đánh giá</div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="rounded-none"
              >
                Đóng
              </Button>
              <Button
                color="primary"
                onPress={onSendReview}
                className="rounded-none"
              >
                Đánh giá
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const Review: FC<ReceivedProps> = (props) => (
  <ReviewLayout {...useReview(props)} />
);

export default Review;
