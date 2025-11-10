import type { Offer } from "../../types/products";

export const OrderCard = ({offer, customer}: {offer : Offer, customer? : boolean}) => {

   const savedMoney = Number((offer.originalPrice - offer.peraPrice).toFixed(2));


  return (
    <article
      className="flex flex-col gap-3 p-3 bg-white rounded-2xl"
    >
      <img
        className="h-32 object-cover object-center rounded-lg"
        src={offer.offerImg || "/defaultFoodImg.webp"}
        alt={offer.offerTitle}
      />
      <div>
        <h3 className="text-lg font-semibold text-Darkgray300">
          {offer.offerTitle}
        </h3>
        <div className="flex items-center gap-1.5 justify-between">
          <p className="font-bold text-morado text-lg">${offer.peraPrice}</p>
          {
            customer ? 
          <p className="text-Darkgray500/50 text-sm">
            (Saved ${savedMoney})
          </p>

            :
          <p className="text-Darkgray500/50 text-sm">
            ({offer.stock} in stock)
          </p>
          }
        </div>
      </div>
    </article>
  );
};
