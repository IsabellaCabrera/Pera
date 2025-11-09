import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialState } from "../../types/products";
import type { UserData } from "../../types/auth";

const initialState: InitialState = {
  restaurants: [],
  cart: [],
  orders: [],
  offers: [],
};

const productsSlice = createSlice({
  name: "restuarants",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<UserData>) => {
      state.restaurants = [...state.restaurants, action.payload];
    },
  },
});

export const { setRestaurants } = productsSlice.actions;
export default productsSlice.reducer;
