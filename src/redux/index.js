import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import lessonReducer from "./slices/lessonSlice";
import questionReducer from "./slices/questionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    lesson: lessonReducer,
    question: questionReducer,
  },
});

export default store;
