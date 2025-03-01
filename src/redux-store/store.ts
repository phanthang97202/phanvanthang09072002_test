import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contact-redux";

export const reduxStore = configureStore({
  reducer: {
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
