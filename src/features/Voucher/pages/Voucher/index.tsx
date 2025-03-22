import { FC } from "react";
import useVoucher, { Props, ReceivedProps } from "./hook";

const VoucherLayout: FC<Props> = ({ ...props }) => {
  return <div>Voucher</div>;
};

const Voucher: FC<ReceivedProps> = (props) => (
  <VoucherLayout {...useVoucher(props)} />
);

export default Voucher;
