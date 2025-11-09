import { useNavigate } from "react-router";
import { Button } from "../Button";
import type { Offer } from "../../types/products";

export const ProductCard = ({ offer }: { offer: Offer }) => {
  const navigate = useNavigate();

  const savedMoney = offer.originalPrice - offer.peraPrice;

  return (
    <article className="flex flex-col gap-6 p-4 bg-white rounded-2xl">
      <img
        className="h-[140px] w-auto object-cover rounded-lg "
        src={offer.offerImg || "/defaultFoodImg.webp"}
        alt={offer.offerTitle}
      />
      <div>
        <h3 className="font-bold">{offer.offerTitle}</h3>
        <p className="text-morado font-bold text-2xl flex items-center gap-1">
          ${offer.peraPrice}
          <span className="text-black/30 font-normal text-xl">
            (Save ${savedMoney})
          </span>
        </p>
      </div>
      <Button onClick={() => navigate("/customer/checkout")}>Add</Button>
    </article>
  );
};
