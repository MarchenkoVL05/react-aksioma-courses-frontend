import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchLessons = createAsyncThunk("lesson/fetchLessons", async () => {
  try {
    const response = await axios.get("/lesson", {
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

const lessonSlice = createSlice({
  name: "lesson",
  initialState: {
    lessons: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.status = "resolved";
        state.lessons = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default lessonSlice.reducer;
