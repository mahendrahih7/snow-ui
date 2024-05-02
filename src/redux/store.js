import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import regSlice from "./features/regSlice";
import loginSlice from "./features/loginSlice";
import sellerLoginSlice from "./features/sellers/sellerLoginSlice";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    regUser: regSlice,
    loginUser: loginSlice,
    loginSeller: sellerLoginSlice
  },
});

// export type RootState = ReturnType<typeof store.getState>;
