import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const sendOTP = createAsyncThunk(
  "otp/sendOTP",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/send-otp");
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "otp/verifyOTP",
  async (otp, { rejectWithValue }) => {
    try {
      const response = await axios.post("/verify-otp", { otp });
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    error: null,
    success: false,
    verify_success: false,
  },
  reducers: {
    resetOTPState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        toast.success("OTP sent successfully");
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.verify_success = true;
        toast.success("OTP verify successfully");
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { resetOTPState } = otpSlice.actions;
export default otpSlice.reducer;
