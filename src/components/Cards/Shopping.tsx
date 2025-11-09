import type { ShoppingCardProps } from "../../types/cards";
import { Add } from "../Add";
import { Delete } from "../Delete";

export const ShoppingCard = ({
  offer,
  delete: onDelete,
}: ShoppingCardProps) => {
  return (
    <article className="flex items-center gap-4 bg-card-gray/70 rounded-3xl p-4 w-full">
      {/* Imagen */}
      <div className="flex-shrink-0">
        <img
          src={offer.offerImg}
          alt={offer.offerTitle}
          className="w-28 h-28 object-cover rounded-2xl bg-secondary"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-3xl font-bold text-Darkgray300">{offer.offerTitle}</h3>
        <p className="text-gray-500 text-sm leading-snug">{offer.description}</p>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-4">
        <Add number={1} />
        <span className="text-xl font-medium text-Darkgray300 whitespace-nowrap">
          ${offer.peraPrice}
        </span>
        <Delete id={offer.offerTitle} onDelete={onDelete} />
      </div>
    </article>
  );
};