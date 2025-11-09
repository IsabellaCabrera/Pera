import type { UserData } from "./auth";

export interface Offer {
  offerImg: string;
  offerTitle: string;
  description: string;
  originalPrice: number;
  peraPrice: number;
  stock: number;
  windowEnd: string;
  windowStart: string;
}


export interface InitialState {
  restaurants: UserData[];
  restaurant: UserData;
  cart: [];
  orders: [];
  offers: [];
}
