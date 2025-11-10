import { useSelector } from "react-redux";
import { NavBar } from "../components/Header/NavBar";
import type { RootState } from "../redux/store";
import { SellerOrderCard } from "../components/Cards/SellerOrder";

export const CurrentOrders = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <NavBar />
      <main className="my-8 mx-6 md:mx-12 lg:mx-16 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-morado">Current Orders</h1>
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {user?.orders?.length === 0 || user?.orders === undefined ? (
            <p>No orders Yet</p>
          ) : (
            user?.orders?.map((order, i) => (
              <SellerOrderCard order={order} number={i + 1} />
            ))
          )}
        </section>
      </main>
    </>
  );
};
