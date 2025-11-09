import { Link } from "react-router";
import type { RestaurantNearYouCardProps } from "../../types/cards";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../../redux/slices/productsSlice";
import { Rating } from "../Tags/Rating";

export const RestaurantNearYou = ({
  restaurant,
}: RestaurantNearYouCardProps) => {
  const dispatch = useDispatch();

  return (
    //localhost:5173/customer/mcdonalds
    <Link to={`/customer/${restaurant.name}`}>
      <article
        className=" bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
        onClick={() => dispatch(setRestaurant(restaurant))}
      >
        {/* Imagen */}
        <div className="w-full h-40">
          <img
            src={restaurant.profileImg || "/defaultRestaurantImg.webp"}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={restaurant.profileImg || "/defaultRestaurantImg.webp"}
                alt={restaurant.name}
                className="w-10 h-10 object-cover object-center rounded-full"
              />
              <p className="text-gray-800 font-semibold text-base">
                {restaurant.name}
              </p>
            </div>
            <Rating value={4.9} />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-morado text-sm">
              Prices from <span className="font-bold">$6.99</span>
            </p>
            <p className="text-gray-500 text-sm">(Save $6)</p>
          </div>
        </div>
      </article>
    </Link>
  );
};
