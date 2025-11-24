import { useEffect, useState } from "react";
import { NavBar } from "../components/Header/NavBar";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Tags/Checkbox";
import { InformativeCard } from "../components/Cards/Informative";
import { RestaurantCard } from "../components/Cards/Restaurant";
import { RestaurantNearYou } from "../components/Cards/RestaurantNearYou";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from "../redux/slices/productsSlice";
import type { RootState } from "../redux/store";
import type { UserData } from "../types/auth";

const restaurant = [
  {
    id: crypto.randomUUID(),
    img: "/mclogo.webp",
    restaurant: "McDonalds",
  },
  {
    id: crypto.randomUUID(),
    img: "/kfclogo.webp",
    restaurant: "KFC",
  },
  {
    id: crypto.randomUUID(),
    img: "/elcorrallogo.webp",
    restaurant: "El Corral",
  },
  {
    id: crypto.randomUUID(),
    img: "/frisbylogo.webp",
    restaurant: "Frisby",
  },
  {
    id: crypto.randomUUID(),
    img: "/qbanologo.webp",
    restaurant: "Sandwich Qbano",
  },
];

const loopaInfo = [
  {
    id: crypto.randomUUID(),
    logo: "/Pera-morado.svg",
    text: "50% in most restaurants",
    background: "/Informativebgramen.webp",
  },
  {
    id: crypto.randomUUID(),
    logo: "/Pera-morado.svg",
    text: "50% in most restaurants",
    background: "/Informativebgtaco.webp",
  },
];

const checkboxOptions = [
  { id: "burgers", label: "Burgers", img: "/burger.svg" },
  { id: "sushi", label: "Sushi", img: "/rolls.svg" },
  { id: "donuts", label: "Donuts", img: "/treat.svg" },
  { id: "hotdogs", label: "Hotdogs", img: "/hotdogs.svg" },
  { id: "bowls", label: "Bowls", img: "/healthy.svg" },
  { id: "colombian", label: "Colombian", img: "/colombian.svg" },
  { id: "pizza", label: "Pizza", img: "/pizza.svg" },
  { id: "chicken", label: "Chicken", img: "/chicken.svg" },
  { id: "kebab", label: "Kebab", img: "/kebab.svg" },
];

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const restaurants = useSelector(
    (state: RootState) => state.products.restaurants
  );
  const dispatch = useDispatch();

  const handleChange = (id: string, isChecked: boolean) => {
    setSelected((prev) =>
      isChecked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  useEffect(() => {
    if (restaurants.length > 0) return;
    const getResturants = async () => {
      try {
        const restaurantsQuery = query(
          collection(db, "users"),
          where("role", "==", "seller")
        );
        const querySnapshot = await getDocs(restaurantsQuery);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const restaurant: UserData = {
            uid: doc.id,
            ...data,
          };
          dispatch(setRestaurants(restaurant));
        });
      } catch (error) {
        console.error(error);
      }
    };
    getResturants();
  }, [dispatch, restaurants.length]);

  const filteredRestaurants = restaurants.filter((rest) => {
    const name = rest.name?.toLowerCase() ?? "";
    const category = rest.category?.toLowerCase() ?? "";

    const matchesName = name.includes(searchTerm.toLowerCase());
    const matchesCategory =
      selected.length === 0 || selected.includes(category);

    return matchesName && matchesCategory;
  });

  return (
    <>
      <NavBar />
      <section className="h-[440px] bg-[url(/herohomeimg.webp)] bg-center bg-cover bg-no-repeat" />
      <section className="my-9 mx-12 flex flex-col gap-8">
        <h2 className="font-bold text-4xl text-morado">
          Restaurants near you!
        </h2>
        <Input
          type="search"
          placeholder="Search for restaurants, dishes..."
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <section className="mx-12 flex justify-between flex-wrap gap-2">
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
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-3">
          {filteredRestaurants.length === 0 ? (
            <p>No restaurants found</p>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <RestaurantNearYou key={restaurant.uid} restaurant={restaurant} />
            ))
          )}
        </div>
      </section>

      {/* InformativeCard */}
      <section className="py-9 px-12">
        <h2 className="font-bold text-4xl text-morado pb-9">Popular food</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          {loopaInfo.map(({ id, logo, text, background }) => (
            <InformativeCard
              key={id}
              logo={logo}
              text={text}
              background={background}
            />
          ))}
        </section>
      </section>

      {/* RestaurantCard */}
      <section className="py-10 px-24 h-fit bg-Darkgray500 my-14 rounded-tl-3xl rounded-br-3xl relative ">
        <h2 className="font-bold text-xl text-white">Top picks</h2>
        <div className="grid grid-flow-col gap-4 pt-2 mt-3 overflow-x-auto scrollbar-hide">
          {restaurant.map(({ id, img, restaurant }) => (
            <RestaurantCard
              key={id}
              img={img}
              restaurant={restaurant}
              whiteVariant
            />
          ))}
          <SlArrowLeft className="absolute top-1/2 left-4 -translate-y-1/2 text-white/30 cursor-pointer w-[32px] h-[32px]" />
          <SlArrowRight className="absolute top-1/2 right-4 -translate-y-1/2 text-white/30 cursor-pointer w-[32px] h-[32px]" />
        </div>
      </section>
    </>
  );
};
