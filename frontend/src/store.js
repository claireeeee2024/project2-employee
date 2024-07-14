import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import onboardingApiSliceReducer from "./slices/onboardingSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    onboarding: onboardingApiSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
