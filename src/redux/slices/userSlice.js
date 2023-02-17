import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const registerUser = createAsyncThunk("user/registerUser", async (userData) => {
  const { repeatPass, ...restUserData } = userData;
  userData = restUserData;

  try {
    const response = await axios.post("/user/registration", userData);
    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const loginUser = createAsyncThunk("user/login", async (userData) => {
  try {
    const response = await axios.post("/user/login", userData);
    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const authUser = createAsyncThunk("user/authUser", async () => {
  try {
    const response = await axios.get("/user/getMe", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    status: null,
    error: null,
    registered: false,
    logged: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const response = action.payload;
        if (response.message === "Не удалось зарегестрироваться") {
          state.error = response.message;
        } else {
          state.status = "resolved";
          state.registered = true;
          state.logged = true;
          localStorage.setItem("token", response.token);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const response = action.payload;
        state.status = "resolved";
        state.logged = true;
        localStorage.setItem("token", response.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(authUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.status = "resolved";
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
