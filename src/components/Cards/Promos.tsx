import type { PromoCardProps } from "../../types/cards";


export const PromosCard = ({
  restuarant,
  img,
  restaurantAvatar,
  promo,
}: PromoCardProps) => {
  return (
    <article className="flex flex-col gap-2">
      <h3 className="font-bold test-xl">{restuarant}</h3>
      <img className="rounded-md flex-1 object-cover object-center" src={`${img}`} alt={restuarant} />
      <figure className="flex items-center gap-2">
        <img className="w-5" src={`${restaurantAvatar}`} alt={restuarant} />
        <p>{`Up to ${promo}% off`}</p>
      </figure>
    </article>
  );
};
