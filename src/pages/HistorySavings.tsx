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
      <section>
        {user?.orders === undefined || user.orders.length === 0 ? (
          <p>No order yet</p>
        ) : (
          user?.orders.map((offer) => <OrderCard offer={offer} />)
        )}
      </section>
    </>
  );
};
