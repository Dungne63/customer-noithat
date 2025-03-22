export type ReceivedProps = Record<string, any>;

const useVoucher = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useVoucher>;

export default useVoucher;
