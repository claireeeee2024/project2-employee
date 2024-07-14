import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("onboarding")
  ? JSON.parse(localStorage.getItem("onboarding"))
  : { sortOption: "Pending" };

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
  },
});

export const {
  setSortOption,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
