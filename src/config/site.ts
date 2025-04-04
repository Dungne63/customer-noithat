import { ROUTE_PATHS } from "@constants/route.const";

export const SITE_NAME =
  import.meta.env.VITE_APP_SITE_NAME || "{empty-site-name}";

export const SITE_DESCRIPTION = "Nội thất Đẳnk Kấp - đẳng cấp là mãi mãi!";

export const SITE_CONTACT = {
  ADDRESS: "Đường 123 - Hà Nội",
  PHONE: "0123456789",
  EMAIL: "dankkap@gmail.com",
  FACEBOOK: "https://www.facebook.com/profile.php?id=61561242152562",
};

export const SITE_PAYMENT_INFO = {
  BANK_NAME: "Ngân hàng Techcombank",
  BANK_NUMBER: "123456789",
  BANK_ACCOUNT_NAME: "TRAN TIEN DUNG",
};

export const SITE_NAVBAR = [
  {
    label: "Trang chủ",
    to: ROUTE_PATHS.DEFAULT,
  },
  {
    label: "Sản phẩm",
    children: [
      {
        label: "Sản phẩm 1",
        to: ROUTE_PATHS.DEFAULT,
      },
      {
        label: "Sản phẩm 2",
        to: ROUTE_PATHS.DEFAULT,
      },
      {
        label: "Sản phẩm 3",
        to: ROUTE_PATHS.DEFAULT,
      },
      {
        label: "Sản phẩm 3",
        to: ROUTE_PATHS.DEFAULT,
      },
    ],
  },
  {
    label: "Bài viết",
    to: ROUTE_PATHS.BLOG,
  },
  {
    label: "Góc cảm hứng",
    to: ROUTE_PATHS.CONTACT,
  },
];
