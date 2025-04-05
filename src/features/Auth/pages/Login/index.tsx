import AuthWrapper from "@features/Auth/components/AuthWrapper";
import { FC } from "react";
import useLogin, { Props, ReceivedProps } from "./hook";
import AppInput from "@components/common/AppInput";
import { Button } from "@heroui/react";
import { ROUTE_PATHS } from "@constants/route.const";

const LoginLayout: FC<Props> = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  navigate,
}) => {
  return (
    <AuthWrapper>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-2xl font-semibold mb-4">Đăng nhập</div>
          <div>
            <div className="mb-2">Email đăng nhập</div>
            <AppInput control={control} name="email" type="text" size="lg" />
            <div className="text-danger text-xs mt-1">
              {errors.email?.message}
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2">Mật khẩu</div>
            <AppInput type="password" control={control} name="password" />
            <div className="text-danger text-xs mt-1">
              {errors.password?.message}
            </div>
          </div>
          <div className="mt-6">
            <Button className="btn w-full" type="submit" color="primary">
              Đăng nhập
            </Button>
          </div>
          <div className="text-right mt-2">
            <span
              className="underline hover:text-secondary text-sm cursor-pointer"
              onClick={() => navigate("/" + ROUTE_PATHS.REGISTER)}
            >
              Chưa có tài khoản?
            </span>
          </div>
          <div className="text-right mt-2">
            <span
              className="underline hover:text-secondary text-sm cursor-pointer"
              onClick={() => navigate("/" + ROUTE_PATHS.FORGOT_PASSWORD)}
            >
              Quên mật khẩu
            </span>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

const Login: FC<ReceivedProps> = (props) => (
  <LoginLayout {...useLogin(props)} />
);

export default Login;
