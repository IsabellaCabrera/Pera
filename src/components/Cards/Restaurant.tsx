import type { RestaurantCardProps } from "../../types/cards";

export const RestaurantCard = ({ img, restaurant, whiteVariant }: RestaurantCardProps) => {
  return (
    <article className="cursor-pointer">
      <figure className="flex flex-col gap-2 items-center justify-center">
        <div
        style={{backgroundImage : `url(${img})`}}
          className={`rounded-full w-32 h-32 bg-cover bg-center bg-no-repeat ring-5 ring-white/20`}
        />
        <p className={`font-medium ${whiteVariant ? "text-mainWhite" :"text-morado"}`}>{restaurant}</p>
      </figure>
    </article>
  );
};
