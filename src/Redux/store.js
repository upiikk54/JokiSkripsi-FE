import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthReducer";
import ProductReducer from "./slices/ProductReducer";
import PurchaseReducer from "./slices/PurchaseReducer";
import SaleReducer from "./slices/SaleReducer";
import SupplierReducer from "./slices/SupplierReducer";
import MerkReducer from "./slices/MerkReducer";
import UnitReducer from "./slices/UnitReducer";
import CategoryReducer from "./slices/CategoryReducer";

const rootReducer = {
    auth: AuthReducer,
    product: ProductReducer,
    purchase: PurchaseReducer,
    sale: SaleReducer,
    supplier: SupplierReducer,
    merk: MerkReducer,
    unit: UnitReducer,
    category: CategoryReducer,
}

const store = configureStore({
    reducer: rootReducer
});

export default store;