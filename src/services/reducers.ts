import AppReducer from "@app/slice";
import CartSiderReducer from "@features/CartSider/services/slice";
import CategorySiderReducer from "@features/CategorySider/services/slice";
import HomeReducer from "@features/Home/services/slice";
import PaymentReducer from "@features/Payment/services/slice";
import ProductReducer from "@features/Product/services/slice";
import UserInfoReducer from "@features/UserInfo/services/slice";

export const reducers = {
  app: AppReducer,
  categorySider: CategorySiderReducer,
  cartSider: CartSiderReducer,
  home: HomeReducer,
  userInfo: UserInfoReducer,
  product: ProductReducer,
  payment: PaymentReducer,
};
