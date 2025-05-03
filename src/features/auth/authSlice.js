import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/authcheck");
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response?.data?.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, ThunkAPI) => {
    try {
      const response = await axios.post("/login", userData);
      return response.data;
    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        return ThunkAPI.rejectWithValue(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        return ThunkAPI.rejectWithValue("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        return ThunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, ThunkAPI) => {
    try {
      const response = await axios.post("/register", userData);
      return response.data;
    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        return ThunkAPI.rejectWithValue(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        return ThunkAPI.rejectWithValue("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        return ThunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, ThunkAPI) => {
    try {
      const response = await axios.get("/logout");
      return response.data;
    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        return ThunkAPI.rejectWithValue(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        return ThunkAPI.rejectWithValue("No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        return ThunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        toast.success("Login successful");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        toast.error("Login failed");
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        toast.success("Logout successful");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { resetError, clearUser } = authSlice.actions;
export default authSlice.reducer;
