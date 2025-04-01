import { FC } from "react";
import usePayment, { Props, ReceivedProps } from "./hook";
import { Navigate } from "react-router";
import AppImage from "@components/AppImage";
import formatVND from "@utils/format/format-vnd";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SelectItem,
  Textarea,
} from "@heroui/react";
import {
  ArchiveBoxArrowDownIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { SITE_PAYMENT_INFO } from "@config/site";
import AppSelect from "@components/common/AppSelect";

const PaymentLayout: FC<Props> = ({
  payment,
  navigate,
  userAddress,
  selectedAddress,
  setSelectedAddress,
  methodPayment,
  setMethodPayment,
  activeVouchers,
  selectedVoucher,
  setSelectedVoucher,
  createPayment,
  note,
  setNote,
}) => {
  if (!payment) {
    return <div>Không có sản phẩm để thanh toán</div>;
  }

  return (
    <div className="w-full flex justify-center pt-8">
      <div className="w-full max-w-[1280px] grid grid-cols-12 gap-8">
        <div className="col-span-7 flex flex-col gap-4">
          <div>
            <div className="text-2xl font-semibold pb-2">Địa chỉ giao hàng</div>
            <div className="border-2 p-4 pt-0">
              <Dropdown>
                <DropdownTrigger>
                  <div className="mt-4 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="font-semibold">địa chỉ:</span>
                          <p className="text-md">
                            {selectedAddress?.ward?.name} -{" "}
                            {selectedAddress?.district?.name} -{" "}
                            {selectedAddress?.province?.name}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="font-semibold">chi tiết:</span>
                          <p className="text-md">{selectedAddress?.address}</p>
                        </div>
                      </div>
                      <div className="text-primary underline">Thay đổi</div>
                    </div>
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dropdown menu with description"
                  classNames={{ base: "w-[720px]" }}
                  variant="faded"
                >
                  {userAddress.length > 0 &&
                    userAddress.map((item: any) => {
                      return (
                        <DropdownItem
                          key={item.index}
                          onPressChange={() => {
                            setSelectedAddress(item);
                          }}
                        >
                          <div className="cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex gap-2 items-center mt-1">
                                  <span className="font-semibold">
                                    địa chỉ:
                                  </span>

                                  <p className="text-md">
                                    {item?.ward?.name} - {item?.district?.name}{" "}
                                    - {item?.province?.name}
                                  </p>
                                </div>
                                <div className="flex gap-2 items-center mt-1">
                                  <span className="font-semibold">
                                    chi tiết:
                                  </span>
                                  <p className="text-md">{item.address}</p>
                                </div>
                              </div>
                              {/* <div>
                              {item?.index === selectedAddress?.index && (
                                <CheckIcon className="size-7 text-primary" />
                              )}
                            </div> */}
                            </div>
                          </div>
                        </DropdownItem>
                      );
                    })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div>
            <div className="text-2xl font-semibold pb-2">Ghi chú giao hàng</div>
            <Textarea
              placeholder="Nhâp lời nhắn đến nhân viên giao hàng..."
              value={note}
              classNames={{
                innerWrapper: "h-[200px] ",
                inputWrapper: "rounded-none",
                input: "text-md",
              }}
              variant="bordered"
              onValueChange={setNote}
            />
          </div>
          <div>
            <div className="text-2xl font-semibold pb-2">
              Phương thức thanh toán
            </div>
            <div className="flex gap-4 select-none">
              <div
                className={`border-2 w-[150px] h-[120px] px-5 ${
                  methodPayment == "bank_transfer" && "border-black"
                } flex flex-col items-center justify-center cursor-pointer`}
                onClick={() => setMethodPayment("bank_transfer")}
              >
                <CreditCardIcon className="size-10" />
                <div>Chuyển khoản</div>
              </div>
              <div
                className={`border-2 w-[150px] h-[120px] px-5 ${
                  methodPayment == "COD" && "border-black"
                } flex flex-col items-center justify-center cursor-pointer`}
                onClick={() => setMethodPayment("COD")}
              >
                <ArchiveBoxArrowDownIcon className="size-10" />
                <div>COD</div>
              </div>
            </div>
            {methodPayment == "bank_transfer" && (
              <div className="flex flex-col gap-2 mt-4">
                <div className="text-xl">{SITE_PAYMENT_INFO.BANK_NAME}</div>
                <div>
                  Tên chủ tài khoản: {SITE_PAYMENT_INFO.BANK_ACCOUNT_NAME}
                </div>
                <div>Số tài khoản: {SITE_PAYMENT_INFO.BANK_NUMBER}</div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-5 border-2 flex flex-col gap-4 p-4">
          <div className="text-2xl font-semibold border-b-1 pb-2">
            Tóm tắt đơn hàng
          </div>
          <div className="border-b-1 pb-4">
            <div className="mb-2 text-lg">
              Sản phẩm ({payment?.items?.length | 0})
            </div>
            <div className="flex flex-col gap-4 px-2">
              {payment?.items?.length > 0 &&
                payment.items.map((item: any) => {
                  return (
                    <div
                      key={item._id}
                      className="relative pb-2 flex flex-col gap-3 group border-1 border-transparent hover:border-gray-200 p-2 rounded-xl ease-in hover:scale-105 duration-200"
                    >
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
                          {item.quantity}
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="font-semibold">
                            {item.productId.name}
                          </div>
                          <div className="text-primary">
                            {formatVND(item.productId.price)}
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
          </div>
          <div className="flex justify-between border-b-1">
            <div className="text-lg">Tổng</div>{" "}
            <div>{formatVND(payment.total)}</div>
          </div>
          <div className="border-b-1 pb-2">
            <div className="flex justify-between items-center">
              <div className="text-lg">Voucher</div>{" "}
              <div className="w-[200px]">
                <AppSelect
                  size="md"
                  selectedKeys={[selectedVoucher?._id || ""]}
                  onSelectionChange={(e) =>
                    setSelectedVoucher(
                      activeVouchers.find((item) => e.currentKey == item._id)
                    )
                  }
                >
                  {activeVouchers.map((item) => (
                    <SelectItem key={item._id}>{item.name}</SelectItem>
                  ))}
                </AppSelect>
              </div>
            </div>
            {!!selectedVoucher && (
              <div className="flex flex-col gap-1">
                <div>Tên voucher: {selectedVoucher.code}</div>
                <div>
                  Giảm đến:{" "}
                  {!!selectedVoucher?.isPercentage
                    ? selectedVoucher.discount + "%"
                    : formatVND(selectedVoucher.discount)}
                </div>
                {!!selectedVoucher?.minOrderValue && (
                  <div>
                    Điều kiện: tổng đơn ít nhất đạt{" "}
                    {formatVND(selectedVoucher.minOrderValue)}{" "}
                    {selectedVoucher.minOrderValue < payment.total ? (
                      <span className="text-success">(Đủ điều kiện)</span>
                    ) : (
                      <span className="text-danger">(Không đủ điều kiện)</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <div className="text-lg font-semibold">Thành tiền</div>{" "}
            <div>
              {formatVND(
                !!selectedVoucher
                  ? selectedVoucher?.isPercentage
                    ? payment?.total -
                      payment?.total * selectedVoucher?.discount
                    : payment?.total - selectedVoucher?.discount < 0
                    ? 0
                    : payment?.total - selectedVoucher?.discount
                  : payment?.total
              )}
            </div>
          </div>
          <div className="mt-4">
            <Button
              className="w-full rounded-none bg-black text-white"
              size="lg"
              isDisabled={
                !!selectedVoucher
                  ? selectedVoucher?.minOrderValue > payment.total
                  : false
              }
              onPress={() => createPayment()}
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payment: FC<ReceivedProps> = (props) => (
  <PaymentLayout {...usePayment(props)} />
);

export default Payment;
