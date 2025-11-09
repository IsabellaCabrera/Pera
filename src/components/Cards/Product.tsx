import { Button } from "../Button";
import type { Offer } from "../../types/products";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../redux/slices/productsSlice";
import type { RootState } from "../../redux/store";

export const ProductCard = ({ offer }: { offer: Offer }) => {
  const cart = useSelector((state: RootState) => state.products.cart);
  const dispatch = useDispatch();

  const savedMoney = Number((offer.originalPrice - offer.peraPrice).toFixed(2));

  const isInCart = cart.some(
    (product) => product.offerTitle === offer.offerTitle
  );

  const handlSaveToCart = () => {
    dispatch(setCart(offer));
  };

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
      <Button disabled={isInCart} onClick={handlSaveToCart}>
        {isInCart ? "Already Added" : "Add"}
      </Button>
    </article>
  );
};
