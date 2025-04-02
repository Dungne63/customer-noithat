import { useAppDispatch, useAppSelector } from "@services/store";
import { OrderActions, OrderSelectors } from "./services/slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { defaultPagination } from "./services/const";

export type ReceivedProps = Record<string, any>;

const useOrder = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const [pagination, setPagination] = useState(defaultPagination);
  const [reviewingOrder, setReviewingOrder] = useState<any>(null);
  const orderStatus: { [key: string]: { label: string; color: string } } = {
    pending: { label: "đang chờ xử lý", color: "warning" },
    shipping: { label: "đang giao hàng", color: "warning" },
    completed: { label: "đã hoàn thành", color: "success" },
    cancelled: { label: "đã huỷ", color: "warning" },
  };

  const orders = useAppSelector(OrderSelectors.orders);

  const confirmReceived = (orderId: any) => {
    dispatch(
      OrderActions.confirmReceived({ orderId, onSuccess: () => getOrder() })
    );
  };
  const confirmCancelled = (orderId: any) => {
    dispatch(
      OrderActions.confirmCancelled({ orderId, onSuccess: () => getOrder() })
    );
  };

  const getOrder = () =>
    dispatch(
      OrderActions.getOrder({
        pagination,
        onSuccess: (data: any) =>
          setPagination({
            limit: Number(data.limit),
            page: Number(data.page),
            totalItems: data.totalItems,
            totalPages: data.totalPages,
          }),
      })
    );

  useEffect(() => {
    getOrder();
  }, [pagination.page]);

  const onChangePagination = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return {
    orderStatus,
    orders,
    pagination,
    onChangePagination,
    confirmReceived,
    confirmCancelled,
    reviewingOrder,
    setReviewingOrder,
    ...props,
  };
};

export type Props = ReturnType<typeof useOrder>;

export default useOrder;
