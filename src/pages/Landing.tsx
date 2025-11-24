import { useDispatch, useSelector } from "react-redux";
import { LoopaCard } from "../components/Cards/Loopa";
import { PromosCard } from "../components/Cards/Promos";
import { RestaurantCard } from "../components/Cards/Restaurant";
import { Footer } from "../components/Footer";
import { OrderNowForm } from "../components/Forms/OrderNow";
import { NavBar } from "../components/Header/NavBar";
import { Map } from "../components/Map";
import type { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { setRestaurants } from "../redux/slices/productsSlice";
import type { UserData } from "../types/auth";

const loopaInfo = [
  {
    id: crypto.randomUUID(),
    title: "Save food by Taking care of your business",
    description: "Create a business account",
    img: "loopCardImg.webp",
  },
  {
    id: crypto.randomUUID(),
    title: "Save food by Taking care of your business",
    description: "Create a business account",
    img: "loopCardImg.webp",
  },
  {
    id: crypto.randomUUID(),
    title: "Save food by Taking care of your business",
    description: "Create a business account",
    img: "loopCardImg.webp",
  },
];

const promoInfo = [
  {
    id: crypto.randomUUID(),
    restaurant: "McDonalds",
    img: "mc.webp",
    avatar: "/mclogo.webp",
    promo: 50,
  },
  {
    id: crypto.randomUUID(),
    restaurant: "Frisby",
    img: "/frisbybanner.jpg",
    avatar: "frisbylogo.webp",
    promo: 50,
  },
];

export const Landing = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    address: "Universidad Icesi",
    name: "Restaurant",
  });
  const restaurants = useSelector(
    (state: RootState) => state.products.restaurants
  );

  const dispatch = useDispatch();

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

  return (
    <>
      <NavBar />
      <section className="h-[440px] bg-[url(/heroimg.webp)] bg-center bg-cover bg-no-repeat" />
      <section className="py-9 px-12 ">
        <h2 className="font-bold text-xl">What Can you find in Pera</h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-auto-fit gap-3 mt-3">
          {loopaInfo.map(({ id, title, description, img }) => (
            <LoopaCard
              key={id}
              img={img}
              title={title}
              description={description}
            />
          ))}
        </section>
      </section>
      <section className="py-9 px-12 bg-[url(/ordernow.webp)] bg-cover bg-center bg-no-repeat h-[500px] flex flex-col justify-center  ">
        <OrderNowForm />
      </section>
      <section className="py-9 px-12">
        <h2 className="font-bold text-xl">The best promos!</h2>
        <section className="mb-8 grid grid-cols-1 sm:grid-cols-2  gap-3 mt-3">
          {promoInfo.map(({ id, img, restaurant, avatar, promo }) => (
            <PromosCard
              key={id}
              img={img}
              restaurantAvatar={avatar}
              restuarant={restaurant}
              promo={promo}
            />
          ))}
        </section>
      </section>
      <section className="py-9 px-12">
        <h2 className="font-bold text-xl">Top 10 Picks!</h2>
        <section className="grid grid-flow-col justify-between gap-4 mt-3 overflow-x-auto scrollbar-hide">
          {restaurants.map((restaurant) => (
            <div
              onClick={() =>
                setRestaurantInfo({
                  name: restaurant.name || "Restaurant",
                  address: restaurant.address || "Restaurant Address",
                })
              }
            >
              <RestaurantCard
                key={restaurant.uid}
                img={restaurant.profileImg || "/defaultRestaurantImg.webp"}
                restaurant={restaurant.name || "Restaurant"}
              />
            </div>
          ))}
        </section>
      </section>
      <section className="py-9 px-12">
        <Map
          address={restaurantInfo.address}
          markerTitle={restaurantInfo.name}
        />
      </section>
      <Footer />
    </>
  );
};
