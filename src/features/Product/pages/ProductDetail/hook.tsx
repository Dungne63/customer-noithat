import { CartSiderActions } from "@features/CartSider/services/slice";
import {
  ProductActions,
  ProductSelectors,
} from "@features/Product/services/slice";
import { useAppDispatch, useAppSelector } from "@services/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export type ReceivedProps = Record<string, any>;

const useProductDetail = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState<any>(null);
  const [showingImage, setShowingImage] = useState<any>(null);
  const [reviews, setReviews] = useState<any>(null);
  const [reviewPagination, setReviewPagination] = useState<any>();

  const addToCart = (product: any) => {
    dispatch(
      CartSiderActions.addItemCart({
        body: { productId: product._id, quantity: 1 },
        onSuccess: () => dispatch(CartSiderActions.setIsOpening(true)),
      })
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(
        ProductActions.getDetailProduct({
          productId: id,
          onSuccess: (data: any) => {
            setProductDetail({ ...data, images: [...new Set(data.images)] });
            if (data?.images?.[0]) setShowingImage(data.images[0]);
          },
        })
      );
      dispatch(
        ProductActions.getReviewProduct({
          productId: id,
          onSuccess: (data: any) => {
            if (data.data) {
              setReviews(data.data);
            }
            setReviewPagination({
              limit: data.limit,
              page: data.page,
              totalItems: data.totalItems,
              totalPages: data.totalPages,
            });
          },
        })
      );
    }
  }, [id]);

  return {
    showingImage,
    setShowingImage,
    navigate,
    productDetail,
    reviews,
    setReviews,
    reviewPagination,
    setReviewPagination,
    addToCart,
    ...props,
  };
};

export type Props = ReturnType<typeof useProductDetail>;

export default useProductDetail;
