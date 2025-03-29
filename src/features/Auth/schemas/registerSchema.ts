import { validatePassword } from "@utils/validate.util";
import * as yup from "yup";

export const registerStep1Schema = yup
  .object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Không được bỏ trống email"),
  })
  .required();

export const registerStep2Schema = yup
  .object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Không được bỏ trống email"),
    otp: yup.string().required("Chưa điền OTP"),
  })
  .required();

export const registerStep3Schema = yup
  .object({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Không được bỏ trống email"),
    password: yup
      .string()
      .required("Chưa điền Mật khẩu")
      .test(
        "is-valid-new-password",
        'Mật khẩu bao gồm 8 đến 32 ký tự, chứa chữ cái in thường, in hoa, số và ký tự đặc biệt "@$!%*?&"',
        (value) => {
          return value ? validatePassword(value) : false;
        }
      ),
    confirmPassword: yup
      .string()
      .required("Chưa điền xác nhận mật khẩu")
      .oneOf(
        [yup.ref("newPassword"), ""],
        "Mật khẩu xác nhận không khớp với mật khẩu"
      )
      .test(
        "is-valid-confirm-password",
        'Mật khẩu bao gồm 8 đến 32 ký tự, chứa chữ cái in thường, in hoa, số và ký tự đặc biệt "@$!%*?&"',
        (value) => {
          return value ? validatePassword(value) : false;
        }
      ),
  })
  .required();
