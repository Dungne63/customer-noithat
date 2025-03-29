import { AppActions } from "@app/slice";
import PasswordInput from "@components/PasswordInput";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@heroui/react";
import { useAppDispatch } from "@services/store";
import { validateEmail, validatePassword } from "@utils/validate.util";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import _ from "lodash";

function useResetPassword(action: "register" | "forgot-password") {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [repasswordErrorMessage, setRepasswordErrorMessage] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    onConformOTP();
  }, [otp]);

  const onResetPassword = () => {
    if (validateEmail(email)) {
      dispatch(
        AppActions.resetPassword({
          action: action,
          email,
          onSuccess: (data: any) => {
            setStep(2);
          },
        })
      );
    } else {
      setEmailErrorMessage("Email không đúng định dạng");
    }
  };

  const onConformOTP = () => {
    dispatch(
      AppActions.conformOTP({
        otp,
        email,
        onSuccess: (data: any, message: any) => {
          toast.success(message);
          setToken(data);
          setStep(3);
        },
      })
    );
  };

  const onValidatePassword = (passwordInput: string) => {
    if (passwordInput !== rePassword) {
      setRepasswordErrorMessage("Mật khẩu nhập lại phải giống với mật khẩu");
    }
    if (!validatePassword(passwordInput)) {
      setPasswordErrorMessage(
        'Mật khẩu bao gồm 8 đến 32 ký tự, chứa chữ cái in thường, in hoa, số và ký tự đặc biệt "@$!%*?&"'
      );

      return;
    }
    setPasswordErrorMessage("");
  };

  const validateRePassword = (rePassword: string) => {
    if (rePassword !== password) {
      setRepasswordErrorMessage("Mật khẩu nhập lại phải giống với mật khẩu");

      return;
    }
    setRepasswordErrorMessage("");
  };

  const isPassValidate = useMemo(
    () =>
      !!password &&
      !!rePassword &&
      !passwordErrorMessage &&
      !repasswordErrorMessage,
    [passwordErrorMessage, repasswordErrorMessage, password, rePassword]
  );

  const onCreatePassword = () => {
    dispatch(
      AppActions.updatePassword({
        password,
        email,
        onSuccess: () => setStep(4),
      })
    );
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    if (!/^\d$/.test(value) && value !== "") return; // Only allow a single digit

    const newOtp = [...otp];

    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a digit is entered and there's a next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: any) => {
    const data = e.clipboardData.getData("Text").slice(0, 6);

    if (/^\d{6}$/.test(data)) {
      setOtp(data.split(""));
      data.split("").forEach((value: string, idx: any) => {
        if (inputs.current[idx]) {
          inputs.current[idx]!.value = value;
        }
      });
      inputs.current[5]?.focus();
    }
  };

  const step1 = () => {
    return (
      <div className="mt-4 pb-4">
        <div className="mb-4">
          <p className="mb-4">Email</p>
          <Input
            errorMessage={emailErrorMessage}
            isInvalid={!_.isEmpty(emailErrorMessage)}
            value={email}
            onChange={(e) => {
              setEmailErrorMessage("");
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-4 text-center">
          <Button
            color="primary"
            isDisabled={_.isEmpty(email)}
            onPress={onResetPassword}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    );
  };

  const step2 = () => {
    return (
      <div className="mt-4 pb-4">
        <p className="mb-4 text-small">Xác thực OTP đăng ký</p>
        <div className="mb-4">
          <p className="mb-4">OTP</p>
          <div className="flex gap-2 justify-center">
            {otp.map((_, index) => (
              <Input
                key={index}
                ref={(el: any) => (inputs.current[index] = el)}
                className="w-[40px]"
                classNames={{
                  input: "text-xl text-center font-bold",
                }}
                maxLength={1}
                type="text"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
              />
            ))}
          </div>
        </div>
        <div className="mb-4 text-center">
          <Button
            color="primary"
            isDisabled={otp.length !== 6}
            onPress={onConformOTP}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    );
  };

  const step3 = () => {
    return (
      <div className="mt-4 pb-4">
        <p className="mb-4 text-small">Tạo mật khẩu cho tài khoản</p>
        <div className="mb-4">
          <p className="mb-4">Mật khẩu</p>
          <PasswordInput
            errorMessage={passwordErrorMessage}
            isInvalid={!_.isEmpty(passwordErrorMessage)}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => {
              onValidatePassword(e.target.value);
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <p className="mb-4">Nhập lại mật khẩu</p>
          <PasswordInput
            errorMessage={repasswordErrorMessage}
            isInvalid={!_.isEmpty(repasswordErrorMessage)}
            placeholder="Nhập lại mật khẩu"
            value={rePassword}
            onChange={(e) => {
              validateRePassword(e.target.value);
              setRePassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-4 text-center">
          <Button
            color="primary"
            isDisabled={!isPassValidate}
            onPress={onCreatePassword}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    );
  };

  const step4 = () => {
    return (
      <div className="mt-4 pb-4">
        <div className="flex items-center justify-center mb-4">
          <CheckCircleIcon className="size-40 text-success" />
        </div>
        <p className="mb-4 text-small text-center">
          Đổi mật tài khoản thành công
        </p>
        <div className="mb-4">
          <p className="text-center">
            Vui lòng đăng nhập để tiếp tục trải nghiệm hệ thống
          </p>
        </div>
        <div className="mb-4 text-center">
          <Button
            color="primary"
            onPress={() => {
              navigate("/login");
            }}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    );
  };

  const getStepComponent = () => {
    switch (step) {
      case 1:
        return step1();
      case 2:
        return step2();
      case 3:
        return step3();
      case 4:
        return step4();
    }
  };

  return { currentStep: step, stepComponent: getStepComponent() };
}

export default useResetPassword;
