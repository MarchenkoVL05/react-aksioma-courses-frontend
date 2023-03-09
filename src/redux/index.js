import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";
import lessonReducer from "./slices/lessonSlice";
import questionReducer from "./slices/questionSlice";
import resultReducer from "./slices/resultSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    lesson: lessonReducer,
    question: questionReducer,
    result: resultReducer,
  },
});

export default store;
