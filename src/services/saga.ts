import { AppSaga } from "@app/saga";
import { CartSiderSaga } from "@features/CartSider/services/saga";
import { CategorySiderSaga } from "@features/CategorySider/services/saga";
import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([call(AppSaga), call(CategorySiderSaga), call(CartSiderSaga)]);
}
