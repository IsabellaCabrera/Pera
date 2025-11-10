import type { ComponentProps } from "react";
import type { Rating } from "../components/Tags/Rating";
import type { Add } from "../components/Add";
import type { UserData } from "./auth";
import type { Offer } from "./products";

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

// export type RestaurantNearYouCardProps = {
//   img: string;
//   restaurantimg: string;
//   restaurant: string;
//   ratingProps: ComponentProps<typeof Rating>;
//   price: string;
//   save: string;
// };
export type RestaurantNearYouCardProps = {
  restaurant: UserData;
};

export interface ShoppingCardProps {
  offer: Offer;
  delete: (id: string | number) => void;
}

export interface AvailabilityProps {
  day: string;
  selectedHours: string[];
  onChange: (hours: string[]) => void;
}

export interface StatCardProps {
  stat: string;
  title: string;
}
