import { OrderActions } from "@features/Order/services/slice";
import { useAppDispatch } from "@services/store";
import { useEffect, useState } from "react";

export type ReceivedProps = {
  reviewingOrder: any;
  setReviewingOrder: (data: any) => void;
};

const useReview = (props: ReceivedProps) => {
  const [reviews, setReviews] = useState<any>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!props.reviewingOrder && props?.reviewingOrder?.items.length > 0) {
      setReviews(
        props.reviewingOrder.items.map(({ productId }: any) => ({
          productId: productId._id,
          comment: "",
          rating: 0,
        }))
      );
    }
  }, [props.reviewingOrder]);

  const onSendReview = () => {
    dispatch(
      OrderActions.sendReviews({
        body: {
          orderId: props.reviewingOrder._id,
          reviews,
        },
        onSuccess: () => props.setReviewingOrder(null),
      })
    );
  };

  return {
    onSendReview,
    reviews,
    setReviews,
    ...props,
  };
};

export type Props = ReturnType<typeof useReview>;

export default useReview;
