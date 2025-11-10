import { useSelector } from "react-redux";
import { NavBar } from "../components/Header/NavBar";
import type { RootState } from "../redux/store";
import { OrderCard } from "../components/Cards/Order";

export const HistorySavings = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <NavBar />
      {/* Hero */}
      <section className="hidden md:block h-[20dvh] md:h-[30dvh] xl:h-[40dvh] bg-[url(/hs.webp)] bg-center bg-cover bg-no-repeat" />
      {/* Orders */}
      <section className="my-8 mx-6 md:mx-12 lg:mx-16">
        <h1 className="font-medium text-morado text-3xl">Your fav orders in the past</h1>
        {user?.orders === undefined || user?.orders.length === 0 ? (
          <p>No orders Yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-6">
            {user?.orders?.map((order) =>
              order.items.map((offer) => <OrderCard customer offer={offer} />)
            )}
          </div>
        )}
      </section>
    </>
  );
};
