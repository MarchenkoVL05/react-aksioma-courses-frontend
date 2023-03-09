import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

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

const resultSlice = createSlice({
  name: "result",
  initialState: {
    result: {},
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(passTest.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(passTest.fulfilled, (state, action) => {
        state.status = "resolved";
        state.result = action.payload;
      })
      .addCase(passTest.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default resultSlice.reducer;
