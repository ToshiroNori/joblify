import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import otpReducer from "./features/auth/OTP/otpSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    otp: otpReducer,
  },
});

export default store;
