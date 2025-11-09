import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialState } from "../../types/products";
import type { UserData } from "../../types/auth";

const initialState: InitialState = {
  restaurants: [],
  restaurant: {},
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
    setRestaurant: (state, action: PayloadAction<UserData>) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurants, setRestaurant } = productsSlice.actions;
export default productsSlice.reducer;
