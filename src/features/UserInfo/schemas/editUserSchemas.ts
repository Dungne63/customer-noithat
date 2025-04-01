import { isPhoneNumber, validateName } from "@utils/validate.util";
import * as yup from "yup";

export const editUserSchemas = yup
  .object({
    gender: yup.string().required("Không được bỏ trống Giới  tính"),
    birthday: yup.string().required("Không được bỏ trống Ngày sinh"),
    fullName: yup
      .string()
      .min(5, "Họ và Tên phải có ít nhất 5 ký tự")
      .max(30, "Họ và Tên có nhiều nhất 30 ký tự")
      .test(
        "is-valid-name",
        "Họ và Tên không bao gồm số và ký tự đặc biệt",
        (value) => {
          return value ? validateName(value) : false;
        }
      )
      .required("Không được bỏ trống Họ và Tên"),
    phoneNumber: yup
      .string()
      .required("Không được bỏ trống Số điện thoại")
      .test("is-valid-phone", "Số điện thoại không hợp lệ", (value) => {
        return value ? isPhoneNumber(value) : false;
      }),
    email: yup.string().email("Email không hợp lệ"),

    //     address: yup
    //       .array()
    //       // .of(yup.string().required())
    //       .required("Không được bỏ trống Hình ảnh"),
  })
  .required();
