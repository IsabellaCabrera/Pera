import type { ComponentProps } from "react";
import type { Rating } from "../components/Tags/Rating";
import type { Add } from "../components/Add";

export type LoopaCardProps = {
  img: string;
  title: string;
  description: string;
};

export type PromoCardProps = {
  restuarant: string;
  img: string;
  restaurantAvatar: string;
  promo: number;
};

export type RestaurantCardProps = {
  img: string;
  restaurant: string | null;
  whiteVariant?: boolean;
};

export type InformativeCardProps = {
  logo: string;
  text: string;
  background: string;
};

export type RestaurantNearYouCardProps = {
  img: string;
  restaurantimg: string;
  restaurant: string;
  ratingProps: ComponentProps<typeof Rating>;
  price: string;
  save: string;
};

export interface ShoppingCardProps {
  id: string | number;
  image: string;
  title: string;
  description: string;
  add: ComponentProps<typeof Add>;
  price: number | string;
  delete: (id: string | number) => void;
}

export interface AvailabilityProps {
  day: string;
  selectedHours: string[];
  onChange: (hours: string[]) => void;
}
