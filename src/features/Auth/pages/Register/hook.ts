import useResetPassword from "@hooks/useResetPassword";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useRegister = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const { currentStep, stepComponent } = useResetPassword("register");
  return {
    currentStep,
    stepComponent,
    navigate,
    ...props,
  };
};

export type Props = ReturnType<typeof useRegister>;

export default useRegister;
