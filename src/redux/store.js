import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import regSlice from "./features/regSlice";
import loginSlice from "./features/loginSlice";
import sellerLoginSlice from "./features/sellers/sellerLoginSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import sellerProductSlice from "./features/sellers/sellerProductSlice";
import sellerPurchaseSlice from "./features/sellers/sellerPurchaseSlice";
import sellerWarehouseSlice from "./features/sellers/sellerWarehouseSlice";
import sellerInventorySlice from "./features/sellers/sellerInventorySlice";



// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
// };
// const rootReducer = combineReducers({
//    appState: appStateSlice,
//     regUser: regSlice,
//     loginUser: loginSlice,
//     loginSeller: sellerLoginSlice
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    regUser: regSlice,
    loginUser: loginSlice,
    loginSeller: sellerLoginSlice,
    sellerProducts: sellerProductSlice,
    sellerPurchase: sellerPurchaseSlice,
    sellerWarehouse: sellerWarehouseSlice,
    sellerInventory: sellerInventorySlice
  },
  // reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({ serializableCheck: false }),
});

// export type RootState = ReturnType<typeof store.getState>;
// export const persistor = persistStore(store);
