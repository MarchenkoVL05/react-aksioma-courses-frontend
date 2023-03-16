import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchResults = createAsyncThunk("result/fetchResults", async () => {
  try {
    const { data } = await axios.get("/result", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const removeResult = createAsyncThunk("result/removeResult", async (id) => {
  try {
    const { data } = await axios.delete("/result", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        resultId: id,
      },
    });

    return data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

export const removeProgress = createAsyncThunk("result/removeProgress", async (progress) => {
  try {
    const { data } = await axios.delete("/result/progress", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        progress,
      },
    });

    return data;
  } catch (error) {
    const customError = error.response ? error.response.data.message : "Network Error";
    throw customError;
  }
});

const resultSlice = createSlice({
  name: "result",
  initialState: {
    results: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Все результаты
      .addCase(fetchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = "resolved";
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Удалить результат
      .addCase(removeResult.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeResult.fulfilled, (state, action) => {
        state.status = "resolved";
        state.results = state.results.filter((result) => {
          return result._id !== action.payload._id;
        });
      })
      .addCase(removeResult.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      // Удалить прогресс ученика
      .addCase(removeProgress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProgress.fulfilled, (state, action) => {
        state.status = "resolved";
        const removedResults = action.payload;
        removedResults.forEach((removedResult) => {
          state.results = state.results.filter((result) => {
            return result._id !== removedResult._id;
          });
        });
      })
      .addCase(removeProgress.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      });
  },
});

export default resultSlice.reducer;
