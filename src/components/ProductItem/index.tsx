import AppImage from "@components/AppImage";
import { CartSiderActions } from "@features/CartSider/services/slice";
import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";
import { useAppDispatch } from "@services/store";
import formatVND from "@utils/format/format-vnd";
import { useNavigate } from "react-router";

export function ProductItem({ product }: { product: any }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addToCart = (product: any) => {
    dispatch(
      CartSiderActions.addItemCart({
        body: { productId: product._id, quantity: 1 },
        onSuccess: () => dispatch(CartSiderActions.setIsOpening(true)),
      })
    );
  };

  return (
    <div className="col-span-4" data-aos="fade-up">
      <div
        className="group transition-transform cursor-pointer border-2 border-transparent hover:border-gray-200  overflow-hidden p-4 duration-300 ease-in"
        onClick={() => {
          navigate(`/product/${product._id}`);
        }}
      >
        <div className="group">
          <div className="flex justify-center group-hover:scale-110 duration-300 ease-in">
            <AppImage
              alt={product.name}
              className="min-w-full rounded-none min-h-full object-cover aspect-video w-full"
              src={`${product?.images[0]}`}
            />
          </div>
          <div className="mt-6 flex flex-col">
            <p className="text-center">{product.name}</p>
            <p className="text-center text-primary font-semibold">
              {formatVND(product.price)}
            </p>
            <div className="flex mt-8 gap-6 invisible group-hover:visible duration-200 ease-in">
              <Button
                className="rounded-none w-full"
                color="primary"
                onPress={() => addToCart(product)}
              >
                Thêm vào giỏ
                <ShoppingBagIcon className="size-5" />
              </Button>
              <Button className="rounded-none w-full" color="secondary">
                Mua
                <ShoppingCartIcon className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
