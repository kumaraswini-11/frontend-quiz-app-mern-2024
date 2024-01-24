import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authenticationSlice";

// Configure the Redux store
export const store = configureStore({
  // Define the reducers that will manage different parts of the state
  reducer: {
    auth: authReducer,
  },

  // Middleware configuration
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },

  // Enabled Redux DevTools extension for development
  devTools: true,
});

/*
   In Redux Toolkit, "serializable" refers to the ability of the state and actions in your store to be easily converted to a plain JavaScript object and serialized to JSON. Redux includes a "serializability check" to catch mistakes where non-serializable values are accidentally included in the state.

   During development, Redux Toolkit's default middleware, `serializableCheck`, performs these checks. It ensures that both the state and actions dispatched to the store are serializable.

   When you disable the serializability check, as done in your Redux store configuration with `serializableCheck: false`, you're informing Redux Toolkit to skip these checks. This can be useful when intentionally including non-serializable values in the state, such as functions, promises, or other complex objects managed by libraries like Immer.
*/
