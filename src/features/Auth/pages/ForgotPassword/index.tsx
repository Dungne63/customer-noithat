import AuthWrapper from "@features/Auth/components/AuthWrapper";
import { FC } from "react";
import useForgotPassword, { Props, ReceivedProps } from "./hook";

const ForgotPasswordLayout: FC<Props> = ({
  currentStep,
  stepComponent,
  navigate,
}) => {
  return (
    <AuthWrapper>
      <div className="text-2xl font-semibold mb-4">Quên mật khẩu</div>
      <div>{stepComponent}</div>
      <div className="text-right mt-2">
        <span
          className="underline hover:text-secondary text-sm cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Quay lại đăng nhập
        </span>
      </div>
    </AuthWrapper>
  );
};

const ForgotPassword: FC<ReceivedProps> = (props) => (
  <ForgotPasswordLayout {...useForgotPassword(props)} />
);

export default ForgotPassword;
