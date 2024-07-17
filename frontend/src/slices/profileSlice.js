import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = profileSlice.actions;

export default profileSlice.reducer;