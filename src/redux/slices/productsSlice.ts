import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialState, Offer } from "../../types/products";
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
    setCart: (state, action: PayloadAction<Offer>) => {
      state.cart = [...state.cart, action.payload];
    },
    deleteFromCart : (state, action: PayloadAction<string| number>) => {
      state.cart = state.cart.filter((offer) => offer.offerTitle !== action.payload)
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setRestaurants, setRestaurant, setCart, deleteFromCart, clearCart } =
  productsSlice.actions;
export default productsSlice.reducer;
