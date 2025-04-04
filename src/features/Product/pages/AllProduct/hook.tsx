import {
  ProductActions,
  ProductSelectors,
} from "@features/Product/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useProductAll = (props: ReceivedProps) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector(ProductSelectors.products);
  const [pagination, setPagination] = useState({
    limit: 6,
    page: 1,
    totalItems: 1,
    totalPages: 1,
  });

  useEffect(() => {
    dispatch(
      ProductActions.getProduct({
        search,
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
  }, [pagination.page, search]);

  const onChangePagination = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return {
    navigate,
    products,
    pagination,
    onChangePagination,
    ...props,
  };
};

export type Props = ReturnType<typeof useProductAll>;

export default useProductAll;
