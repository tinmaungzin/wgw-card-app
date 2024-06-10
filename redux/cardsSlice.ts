import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../types/common";

const initialState: Card[] = [];
export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.push(action.payload);
    },
  },
});
export const { addCard } = cardsSlice.actions;

export default cardsSlice.reducer;