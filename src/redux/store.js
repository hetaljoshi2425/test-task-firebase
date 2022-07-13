import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./Slices";
const store = configureStore({
  reducer: {
    rootReducer: rootReducers,
  }
});

export default store;
