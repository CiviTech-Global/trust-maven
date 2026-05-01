import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  theme: "light" | "dark";
}

const initialState: UiState = {
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
