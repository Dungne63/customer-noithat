export type ReceivedProps = Record<string, any>;

const useContact = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useContact>;

export default useContact;
