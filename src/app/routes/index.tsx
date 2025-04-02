import { lazy, Suspense } from "react";
import { RouteObject, BrowserRouter as Router, useRoutes } from "react-router";
import { ROUTE_PATHS } from "@constants/route.const";
import AuthLayout from "@layouts/AuthLayout";
import MainLayout from "@layouts/MainLayout";
import { useAuth } from "@hooks/useAuth";
import { RouteWrapper } from "./RouteWrapper";
import GlobalLoading from "@components/GlobalLoading";

const HomePage = lazy(() => import("@features/Home"));
const LoginPage = lazy(() => import("@features/Auth/pages/Login"));
const RegisterPage = lazy(() => import("@features/Auth/pages/Register"));
const NotFoundPage = lazy(() => import("@features/NotFound"));
const PermissionDeniedPage = lazy(() => import("@features/PermissionDenied"));
const VoucherPage = lazy(() => import("@features/Voucher/pages/Voucher"));
const ContactPage = lazy(() => import("@features/Contact/pages/Contact"));
const UserInfoPage = lazy(() => import("@features/UserInfo/pages/UserInfo"));
const AllProductPage = lazy(() => import("@features/Product/pages/AllProduct"));
const PaymentPage = lazy(() => import("@features/Payment"));
const ProductDetailPage = lazy(
  () => import("@features/Product/pages/ProductDetail")
);
const OrderPage = lazy(() => import("@features/Order"));

export interface RoutesRendererProps {
  routes: RouteObject[];
}

export function RoutesRenderer({ routes }: RoutesRendererProps) {
  const renderedRoutes = useRoutes(routes);
  return renderedRoutes;
}

function AppRouter() {
  useAuth();

  const getRoutes = () => [
    {
      path: ROUTE_PATHS.DEFAULT,
      element: <RouteWrapper />,
      title: "",
      children: [
        {
          path: ROUTE_PATHS.DEFAULT,
          element: <AuthLayout />,
          title: "",
          children: [
            {
              path: ROUTE_PATHS.REGISTER,
              element: <RegisterPage />,
              title: "",
            },
            {
              path: ROUTE_PATHS.LOGIN,
              element: <LoginPage />,
              title: "",
            },
          ],
        },
        {
          path: ROUTE_PATHS.DEFAULT,
          element: <MainLayout />,
          title: "",
          children: [
            {
              path: ROUTE_PATHS.DEFAULT,
              index: true,
              element: <HomePage />,
              title: "Trang chủ",
            },
            {
              path: ROUTE_PATHS.VOUCHER,
              element: <VoucherPage />,
              title: "Voucher",
            },
            {
              path: ROUTE_PATHS.CONTACT,
              element: <ContactPage />,
              title: "Liên hệ",
            },
            {
              path: ROUTE_PATHS.USER_INFO,
              element: <UserInfoPage />,
              title: "Thông tin người dùng",
            },
            {
              path: ROUTE_PATHS.PRODUCT_ALL,
              element: <AllProductPage />,
              title: "Danh sách sản phẩm",
            },
            {
              path: ROUTE_PATHS.PAYMENT,
              element: <PaymentPage />,
              title: "Thanh toán",
            },
            {
              path: ROUTE_PATHS.PRODUCT,
              element: <ProductDetailPage />,
              title: "Thông tin sản phẩm",
            },
            {
              path: ROUTE_PATHS.ORDER,
              element: <OrderPage />,
              title: "Danh sách đơn hàng",
            },
          ],
        },
      ],
    },

    { path: "*", title: "", element: <NotFoundPage /> },
    {
      path: ROUTE_PATHS.PERMISSION_DENIED,
      title: "Không có quyền truy cập",
      element: <PermissionDeniedPage />,
    },
  ];

  return (
    <Router>
      <Suspense fallback={<GlobalLoading />}>
        <RoutesRenderer routes={getRoutes()} />
      </Suspense>
    </Router>
  );
}

export default AppRouter;
