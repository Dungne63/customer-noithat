import { useAppDispatch, useAppSelector } from "@services/store";
import { PaymentActions, PaymentSelectors } from "./services/slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserInfoSelectors } from "@features/UserInfo/services/slice";

export type ReceivedProps = Record<string, any>;

const usePayment = (props: ReceivedProps) => {
  const dispatch = useAppDispatch();
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [methodPayment, setMethodPayment] = useState<string>("COD");
  const [note, setNote] = useState<string>("");
  const [selectedVoucher, setSelectedVoucher] = useState<any>();

  const navigate = useNavigate();
  const payment = useAppSelector(PaymentSelectors.payment);
  const activeVouchers = useAppSelector(PaymentSelectors.activeVouchers);
  const userAddress = useAppSelector(UserInfoSelectors.userInfo)?.address;

  useEffect(() => {
    if (userAddress) {
      setSelectedAddress(userAddress.find((item: any) => item.isDefault));
    }
  }, [userAddress]);

  useEffect(() => {
    dispatch(PaymentActions.getActiveVouchers({}));
  }, []);

  const createPayment = () => {
    dispatch(
      PaymentActions.createPayment({
        body: {
          items: [...payment.items],
          voucherId: selectedVoucher?._id || "",
          shippingAddress:
            selectedAddress?.ward?.name +
            "-" +
            selectedAddress?.district?.name +
            "-" +
            selectedAddress?.province?.name,
          note,
        },
      })
    );
  };

  return {
    activeVouchers,
    userAddress,
    selectedAddress,
    setSelectedAddress,
    methodPayment,
    setMethodPayment,
    selectedVoucher,
    setSelectedVoucher,
    payment,
    navigate,
    note,
    setNote,
    createPayment,
    ...props,
  };
};

export type Props = ReturnType<typeof usePayment>;

export default usePayment;
