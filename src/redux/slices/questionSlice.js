import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default questionSlice.reducer;
