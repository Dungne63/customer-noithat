import { AppSaga } from "@app/saga";
import { CartSiderSaga } from "@features/CartSider/services/saga";
import { CategorySiderSaga } from "@features/CategorySider/services/saga";
import { HomeSaga } from "@features/Home/services/saga";
import { ProductSaga } from "@features/Product/services/saga";
import { UserInfoSaga } from "@features/UserInfo/services/saga";
import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    call(AppSaga),
    call(CategorySiderSaga),
    call(CartSiderSaga),
    call(HomeSaga),
    call(UserInfoSaga),
    call(ProductSaga),
  ]);
}
