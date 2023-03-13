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

export const filderByCategory = createAsyncThunk("lesson/filderByCategory", async (id) => {
  try {
    const categoryIdObj = {
      categoryId: id,
    };
    const response = await axios.post("/lesson/filter", categoryIdObj, {
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

export const removeQuestion = createAsyncThunk("lesson/removeQuestion", async (questionId) => {
  const response = await axios.delete("/question", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      id: questionId,
    },
  });
  return response.data;
});

export const addQuestion = createAsyncThunk("lesson/addQuestion", async (data) => {
  try {
    const response = await axios.post("/question", data, {
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

export const passTest = createAsyncThunk("result/passTest", async (testResult) => {
  try {
    const testResultObject = {
      answers: testResult.result,
    };
    const response = await axios.post(`/result/${testResult.lessonId}`, testResultObject, {
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
    // lesson = Текущий открытый урок
    lesson: {},
    questions: [],
    // Результат ученика за текущий урок
    result: {},
    status: null,
    lessonStatus: null,
    resultStatus: null,
    error: null,
    message: null,
  },
  reducers: {
    searchedLesson(state, action) {
      state.lessons = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Все уроки
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
      // Один урок
      .addCase(fetchOneLesson.pending, (state) => {
        state.lessonStatus = "loading";
        state.result = {};
      })
      .addCase(fetchOneLesson.fulfilled, (state, action) => {
        state.lessonStatus = "resolved";
        state.lesson = action.payload;
        state.questions = action.payload.questions;
      })
      .addCase(fetchOneLesson.rejected, (state, action) => {
        state.lessonStatus = "rejected";
        state.error = action.error;
      })
      // Удалить урок
      .addCase(removeLesson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeLesson.fulfilled, (state, action) => {
        state.status = "resolved";
        state.lessons = state.lessons.filter((lesson) => lesson._id !== action.payload.removedLesson._id);
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(removeLesson.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      // Отфильтровать уроки по категории
      .addCase(filderByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filderByCategory.fulfilled, (state, action) => {
        state.status = "resolved";
        state.lessons = action.payload;
      })
      .addCase(filderByCategory.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      // Удалить вопрос из урока
      .addCase(removeQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter((question) => question._id !== action.payload.removedQuestion._id);
      })
      // Создать вопрос
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload.question);
      })
      // Сдать тест
      .addCase(passTest.pending, (state) => {
        state.resultStatus = "loading";
        state.error = null;
      })
      .addCase(passTest.fulfilled, (state, action) => {
        state.resultStatus = "resolved";
        state.result = action.payload;
      })
      .addCase(passTest.rejected, (state, action) => {
        state.resultStatus = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { searchedLesson } = lessonSlice.actions;

export default lessonSlice.reducer;
