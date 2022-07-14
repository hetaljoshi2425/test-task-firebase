import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./Slices";
const browserWindow = window;
const store = configureStore({
  reducer: {
    rootReducer: rootReducers,
  },
  devTools:
    browserWindow.__REDUX_DEVTOOLS_EXTENSION__ &&
    browserWindow.__REDUX_DEVTOOLS_EXTENSION__(),
});

export default store;
