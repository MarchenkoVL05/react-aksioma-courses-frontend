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

export const fetchOneLesson = createAsyncThunk("lesson/fetchOneLesson", async (lessonId) => {
  try {
    const response = await axios.get(`/lesson/${lessonId}`, {
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

export const removeLesson = createAsyncThunk("lesson/removeLesson", async (lessonId) => {
  try {
    const response = await axios.delete("/lesson", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        lessonId: lessonId,
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
    lesson: {},
    status: null,
    error: null,
    message: null,
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
      })
      .addCase(fetchOneLesson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOneLesson.fulfilled, (state, action) => {
        state.status = "resolved";
        state.lesson = action.payload;
      })
      .addCase(fetchOneLesson.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(removeLesson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeLesson.fulfilled, (state, action) => {
        state.status = "resolved";
        state.lessons = state.lessons.filter((lesson) => lesson._id !== action.payload.removedLesson._id);
        state.message = action.payload.message;
      })
      .addCase(removeLesson.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default lessonSlice.reducer;
