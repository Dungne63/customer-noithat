import useResetPassword from "@hooks/useResetPassword";
import { useNavigate } from "react-router";

export type ReceivedProps = Record<string, any>;

const useForgotPassword = (props: ReceivedProps) => {
  const navigate = useNavigate();
  const { currentStep, stepComponent } = useResetPassword("forgot-password");
  return {
    currentStep,
    stepComponent,
    navigate,
    ...props,
  };
};

export type Props = ReturnType<typeof useForgotPassword>;

export default useForgotPassword;
