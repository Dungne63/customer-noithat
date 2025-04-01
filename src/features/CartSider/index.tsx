import { FC } from "react";
import useCartSider, { Props, ReceivedProps } from "./hook";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";
import { ShoppingBagIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import AppImage from "@components/AppImage";
import formatVND from "@utils/format/format-vnd";
import AppNumberInput from "@components/common/AppNumberInput";

const CartSiderLayout: FC<Props> = ({
  isOpen,
  onClose,
  cart,
  total,
  onClearCart,
  navigate,
  onRemoveItem,
  onUpdateQuantityItemCart,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            x: 0,
            duration: 0.3,
          } as any,
          exit: {
            x: 100,
            opacity: 0,
            duration: 0.3,
          } as any,
        },
      }}
      onClose={onClose}
      placement="right"
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex gap-1 select-none">
              Giỏ hàng <ShoppingBagIcon className="text-primary size-6" />
            </DrawerHeader>
            <DrawerBody>
              {cart?.length > 0 ? (
                <div className="flex flex-col gap-2 mt-2">
                  {cart.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="relative pb-2 flex flex-col gap-3 group border-1 border-transparent hover:border-gray-200 p-2 rounded-xl ease-in hover:scale-105 duration-200"
                      >
                        <div className="">
                          <XCircleIcon
                            className="size-8 absolute text-danger right-[-10px] top-[-10px] hidden group-hover:block hover:opacity-80 cursor-pointer"
                            onClick={() => onRemoveItem(item.productId._id)}
                          />
                        </div>
                        <div
                          className="flex gap-3 justify-between items-center h-[92px]  cursor-pointer"
                          onClick={() => navigate("/")}
                        >
                          <AppImage
                            src={item.productId.images[0]}
                            className={
                              "w-[120px] h-full object-cover rounded-2xl"
                            }
                          />
                          <div className="flex justify-center items-center gap-1">
                            <div className="font-semibold text-primary">x</div>
                            <AppNumberInput
                              classNames={{
                                inputWrapper: "p-0 px-4 m-0 h-[40px]",
                              }}
                              formatOptions={{
                                style: "decimal",
                                maximumFractionDigits: 0,
                              }}
                              size="sm"
                              className="w-[40px] text-center"
                              minValue={1}
                              maxValue={999999}
                              hideStepper
                              value={item.quantity}
                              onChange={(e) => {
                                onUpdateQuantityItemCart(
                                  item.productId._id,
                                  Number(e)
                                );
                              }}
                            />
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="font-semibold">
                              {item.productId.name}
                            </div>
                            <div className="text-primary">
                              {formatVND(item.productId.price)}
                            </div>
                            <div className="">
                              Tồn kho: {item.productId.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center justify-end flex-wrap">
                          <div className="bg-gray-200 min-w-[20px] h-[25px] rounded-lg flex justify-center items-center px-3 shadow-2xl">
                            {item.productId.size}
                          </div>
                          <div className="bg-gray-200 min-w-[20px] h-[25px] rounded-lg flex justify-center items-center px-3 shadow-2xl">
                            {item.productId.material}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <div className="flex flex-col justify-center items-center">
                    <ShoppingBagIcon className="size-40" />
                    <div className="text-lg mb-2">Giỏ hàng trống</div>
                    <Button
                      color="primary"
                      className="rounded-none"
                      onPress={onClose}
                    >
                      Quay lại mua hàng
                    </Button>
                  </div>
                </div>
              )}
            </DrawerBody>
            <DrawerFooter>
              <div className="w-full">
                <div className="border-b-1 mb-4 pr-6 text-right">
                  Tổng tiền:{" "}
                  <span className="font-semibold">{formatVND(total)}</span>
                </div>
                <div className="flex justify-start w-full gap-4">
                  <Button
                    color="danger"
                    onPress={onClearCart}
                    className="w-full rounded-none"
                  >
                    Dọn dẹp giỏ hàng
                    <TrashIcon className="size-5" />
                  </Button>
                  <Button
                    color="primary"
                    variant="ghost"
                    onPress={onClose}
                    className="w-full rounded-none"
                  >
                    Thanh toán
                    <CurrencyDollarIcon className="size-5" />
                  </Button>
                </div>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

const CartSider: FC<ReceivedProps> = (props) => (
  <CartSiderLayout {...useCartSider(props)} />
);

export default CartSider;
