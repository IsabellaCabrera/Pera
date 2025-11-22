import { RestaurantCard } from "../components/Cards/Restaurant";
import { NavBar } from "../components/Header/NavBar";
import { Rating } from "../components/Tags/Rating";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Tags/Checkbox";
import { FaRegClock } from "react-icons/fa";
import { PiRecycleBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/Cards/Product";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useParams } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { setRestaurant } from "../redux/slices/productsSlice";
import type { UserData } from "../types/auth";
import { Map } from "../components/Map";

const checkboxOptions = [
  {
    id: crypto.randomUUID(),
    label: "Fresh Food",
    img: "/FreshFoodIcon.webp",
  },
  {
    id: crypto.randomUUID(),
    label: "Sales",
    img: "/Sale.webp",
  },
  {
    id: crypto.randomUUID(),
    label: "Cupons",
    img: "/Cupons.webp",
  },
];

export const Restaurante = () => {
  const restaurant = useSelector(
    (state: RootState) => state.products.restaurant
  );
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>([]);

  const params = useParams();

  const handleChange = (id: string, isChecked: boolean) => {
    setSelected((prev) =>
      isChecked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        if (!params.restaurant) return;

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("name", "==", params.restaurant));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const restaurantData: UserData = {
            id: docSnap.id,
            ...docSnap.data(),
          } as unknown as UserData;

          dispatch(setRestaurant(restaurantData));
        } else {
          console.warn("⚠️ No se encontró el restaurante:", params.restaurant);
        }
      } catch (error) {
        console.error("❌ Error al obtener el restaurante:", error);
      }
    };

    fetchRestaurant();
  }, [params.restaurant, dispatch]);

  return (
    <>
      <NavBar />
      <main className="md:px-14 relative ">
        <div className="hidden absolute left-0 bg-azul w-1/2 h-full -z-10 md:block"></div>
        <div
          className="w-full h-[340px] bg-cover bg-center bg-no-repeat rounded-b-4xl relative"
          style={{
            backgroundImage: `url(${
              restaurant.profileImg || "/defaultRestaurantImg.webp"
            })`,
          }}
        >
          <div className=" absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 md:left-[18%] md:translate-x-0">
            <RestaurantCard
              img={restaurant.profileImg || "/defaultRestaurantImg.webp"}
              restaurant={null}
            />
          </div>
        </div>

        <section className=" flex flex-col md:flex-row gap-6  md:gap-10 lg:gap-12 justify-between mt-20 md:mt-14">
          <aside className="w-full px-6">
            <div className="md:pt-14">
              <h1 className="font-bold text-4xl ">{restaurant.name}</h1>
              <p> {restaurant.address}</p>
            </div>

            <article className="bg-mainWhite rounded-2xl shadow-md p-4 my-8">
              {/* Food Waste Saved */}
              <div className="flex items-center justify-between border-b border-gray-200 py-2">
                <span className="flex items-center gap-2 text-black">
                  Food Waste Saved <PiRecycleBold className="text-black" />
                </span>
                <span className="font-normal">18 portions</span>
              </div>

              {/* Delivery */}
              <div className="flex items-center justify-between border-b border-gray-200 py-2">
                <span className="flex items-center gap-2 text-black">
                  Delivery <FaRegClock className="text-black" />
                </span>
                <span className="font-normal">25 min</span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between py-2">
                <span className="text-black">Rating</span>
                <span>
                  <Rating value={4.9} />
                </span>
              </div>
            </article>

            <Map
              address={restaurant.address || ""}
              markerTitle={restaurant.name || ""}
            />
          </aside>

          <aside className="w-full px-6 md:px-0">
            <Input
              type="search"
              name="search-food"
              placeholder="Search by food names"
            />
            <div className=" mt-4 mb-10 flex flex-wrap gap-2">
              {checkboxOptions.map(({ id, label, img }) => (
                <Checkbox
                  key={id}
                  id={id}
                  label={label}
                  img={img}
                  checked={selected.includes(id)}
                  onChange={(isChecked) => handleChange(id, isChecked)}
                />
              ))}
            </div>
            <div className="pb-6 grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:gap-y-6 gap-x-6 md:gap-x-12 md:max-h-[700px] overflow-auto pr-2">
              {restaurant.offers === undefined ||
              restaurant.offers.length === 0 ? (
                <p className="">No offers yet</p>
              ) : (
                restaurant.offers?.map((offer) => (
                  <ProductCard key={offer.offerTitle} offer={offer} />
                ))
              )}
            </div>
          </aside>
        </section>
      </main>
    </>
  );
};
