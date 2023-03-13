import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  try {
    const response = await axios.get("/category");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: null,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.errors = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "resolved";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.payload;
      });
  },
});

export default categorySlice.reducer;
