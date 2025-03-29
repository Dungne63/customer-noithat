import AuthWrapper from "@features/Auth/components/AuthWrapper";
import { FC } from "react";
import useRegister, { Props, ReceivedProps } from "./hook";

const RegisterLayout: FC<Props> = ({
  currentStep,
  stepComponent,
  navigate,
}) => {
  return (
    <AuthWrapper>
      <div className="text-2xl font-semibold mb-4">Đăng ký</div>
      <div>{stepComponent}</div>
      <div className="text-right mt-2">
        <span
          className="underline hover:text-secondary text-sm cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Đã có tài khoản?
        </span>
      </div>
    </AuthWrapper>
  );
};

const Register: FC<ReceivedProps> = (props) => (
  <RegisterLayout {...useRegister(props)} />
);

export default Register;
