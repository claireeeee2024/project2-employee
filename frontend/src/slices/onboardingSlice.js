import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("onboarding")
  ? JSON.parse(localStorage.getItem("onboarding"))
  : {
      sortOption: "Pending",
      username: "",
      onboardingStatus: "",
    };

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
    setSelectedUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
    clearSelectedUsername: (state) => {
      state.username = "";
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
    setOnboardingStatus: (state, action) => {
      state.onboardingStatus = action.payload;
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
    clearOnboardingStatus: (state) => {
      state.onboardingStatus = "";
      localStorage.setItem("onboarding", JSON.stringify(state));
    },
  },
});

export const {
  setSortOption,
  setSelectedUsername,
  clearSelectedUsername,
  setOnboardingStatus,
  clearOnboardingStatus,
  setOnboardingFeedback,
  clearOnboardingFeedback,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
