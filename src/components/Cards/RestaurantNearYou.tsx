import { Link } from "react-router";
import type { RestaurantNearYouCardProps } from "../../types/cards";
import { Rating } from "../Tags/Rating";

export const RestaurantNearYou = ({
  img,
  restaurantimg,
  restaurant,
  ratingProps,
  price,
  save,
}: RestaurantNearYouCardProps) => {

  return (
    //localhost:5173/customer/mcdonalds
    <Link to={`/customer/${restaurant}`}>
      <article className=" bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
        {/* Imagen */}
        <div className="w-full h-40">
          <img
            src={img}
            alt={restaurant}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={restaurantimg}
                alt={restaurant}
                className="w-10 h-10 object-cover object-center rounded-full"
              />
              <p className="text-gray-800 font-semibold text-base">
                {restaurant}
              </p>
            </div>
            <Rating {...ratingProps} />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-morado text-sm">
              Prices from <span className="font-bold">{price}</span>
            </p>
            <p className="text-gray-500 text-sm">(Save {save})</p>
          </div>
        </div>
      </article>
    </Link>
  );
};
