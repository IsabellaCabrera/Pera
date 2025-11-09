import type { UserData } from "./auth";

export interface InitialState {
    restaurants : UserData[],
    cart : [],
    orders : [],
    offers : [],
}