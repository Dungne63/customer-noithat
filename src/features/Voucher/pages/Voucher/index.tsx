import { FC } from "react";
import useVoucher, { Props, ReceivedProps } from "./hook";
import BlogLayout from "../BlogLayout";
import useBlog from "./hook";

const VoucherLayout: FC<Props> = ({ ...props }) => {
  const { blogs, loading } = useBlog(props);

  return (
    <BlogLayout blogs={blogs} loading={loading} />
  );
};

const Voucher: FC<ReceivedProps> = (props) => (
  <VoucherLayout {...useVoucher(props)} />
);

export default Voucher;
