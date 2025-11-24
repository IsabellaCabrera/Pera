import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/Button";
import { NavBar } from "../components/Header/NavBar";
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { setRestaurant } from "../redux/slices/productsSlice";
import { Map } from "../components/Map";

export const Pickup = () => {
  const { orderId } = useParams();
  console.log(orderId);
  
  const user = useSelector((state: RootState) => state.auth.user);
  const restaurant = useSelector(
    (state: RootState) => state.products.restaurant
  );

  const order = user?.orders?.find((order) => order.orderId === orderId);

  

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        if (!order?.items?.[0]?.restaurantId) return;

        const restaurantId = order.items[0].restaurantId;

        const docRef = doc(db, "users", String(restaurantId));

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const restaurantData = {
            uid: docSnap.id,
            ...docSnap.data(),
          };

          dispatch(setRestaurant(restaurantData));
        } else {
          console.warn(
            "⚠️ No se encontró el restaurante con id:",
            restaurantId
          );
        }
      } catch (error) {
        console.error("❌ Error al obtener el restaurante:", error);
      }
    };

    fetchRestaurant();
  }, [order, dispatch]);

  if (!order) {
    return (
      <>
        <NavBar />
        <p className="text-center mt-20 text-xl">Order not found</p>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <section className="relative flex flex-col md:flex-row justify-center items-center sm:gap-14 md:gap-24 lg:gap-36 h-screen px-5 py-8 sm:px-10 md:px-16 lg:px-24">
        <div className="absolute bottom-0 hidden lg:block left-0 w-[48%] h-[340px] bg-amarillo -z-10 rounded-tr-[40px]" />

        <div className="flex gap-10 flex-1 flex-col pt-32 pb-12">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-semibold text-morado m-2.5">
              Your code
            </h2>

            {/* Render dynamic pickup code */}
            <div className="flex gap-2 items-center">
              {order.orderId
                .split("")
                .map((char) => (
                  <p
                    key={char + Math.random()}
                    className="bg-Darkgray500 text-mainWhite text-3xl font-bold rounded-2xl p-5"
                  >
                    {char}
                  </p>
                ))}
              <p className="bg-Darkgray500 text-mainWhite text-3xl font-bold rounded-2xl p-5">
                i
              </p>
            </div>
          </div>

          <div className="w-full h-full rounded-[30px]">
            <Map
              address={restaurant.address || ""}
              markerTitle={restaurant.name || ""}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-16 md:pl-10 lg:pl-20">
          <div className="flex flex-col gap-6">
            <Link to={"/customer/home"}>
              <img
                className="h-[134px] w-[134px]"
                src="/public/Pera-Blue.svg"
                alt="Pera Logo"
              />
            </Link>

            <h1 className="text-3xl font-bold text-morado">
              Your order is ready for you!
            </h1>

            <div className="border border-Darkgray200 rounded-3xl flex flex-col gap-2 mb-6 p-7">
              <h2 className="text-2xl font-medium text-Darkgray200">
                Pickup location
              </h2>
              <p className="text-[16px] font-normal text-Darkgray200">
                {restaurant.address}
              </p>
            </div>

            <Button>Open in maps</Button>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-medium text-Darkgray200">
              Pickup instructions
            </h2>
            <p className="text-[16px] font-normal text-Darkgray200">
              Show your pickup code to the staff at the location. They will
              verify your purchase and hand over your order. Please ensure you
              arrive within the specified pickup window.
            </p>
            <Button secondary>Contact store</Button>
          </div>
        </div>
      </section>
    </>
  );
};
