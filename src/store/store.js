import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice"
import orderReducer from "./reducers/orderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
  },
});
