import AppReducer from "@app/slice";
import CartSiderReducer from "@features/CartSider/services/slice";
import CategorySiderReducer from "@features/CategorySider/services/slice";

export const reducers = {
  app: AppReducer,
  categorySider: CategorySiderReducer,
  cartSider: CartSiderReducer,
};
