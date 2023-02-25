import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/repos/repoSlice";

export const store = configureStore({
  reducer: {
    repo: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
