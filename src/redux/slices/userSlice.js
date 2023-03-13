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

export const getAllUsers = createAsyncThunk("user/getAll", async () => {
  try {
    const response = await axios.get("/user/all", {
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

export const approveUser = createAsyncThunk("user/approveUser", async (id) => {
  try {
    const response = await axios.post(
      "/user/approve",
      {
        userId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.approvedUser;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const blockUser = createAsyncThunk("user/blockUser", async (id) => {
  try {
    const response = await axios.post(
      "/user/block",
      {
        userId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.approvedUser;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const removeUser = createAsyncThunk("user/removeUser", async (id) => {
  try {
    const response = await axios.delete("/user/remove", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        userId: id,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    users: [],
    status: null,
    usersStatus: null,
    error: null,
    registered: false,
    logged: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Регистрация
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
      // Логин
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
      // Проверь меня
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
      })
      // Получить всех пользователей
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      // Допустить ученика
      .addCase(approveUser.pending, (state, action) => {
        state.usersStatus = "loading";
      })
      .addCase(approveUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) => {
          if (user._id === updatedUser._id) {
            user = updatedUser;
          }
          return user;
        });
        state.usersStatus = "resolved";
      })
      // Закрыть доступ ученику
      .addCase(blockUser.pending, (state, action) => {
        state.usersStatus = "loading";
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) => {
          if (user._id === updatedUser._id) {
            user = updatedUser;
          }
          return user;
        });
        state.usersStatus = "resolved";
      })
      // Удалить ученика
      .addCase(removeUser.pending, (state, action) => {
        state.usersStatus = "loading";
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload._id);
        state.usersStatus = "resolved";
      });
  },
});

export default userSlice.reducer;
