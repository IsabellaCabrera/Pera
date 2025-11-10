import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { ShoppingCard } from "../components/Cards/Shopping";
import { Input } from "../components/Input";

export const SellerOrder = () => {
  const order = useSelector((state: RootState) => state.products.order);
  console.log(order);
  const navigate = useNavigate();

  return (
    <section className="py-9 px-12">
      <div className="mb-8">
        <Button onClick={() => navigate(-1)} secondary>
          Go back
        </Button>
      </div>

      <img src="/Pera-morado.svg" alt="Loopa Logo" className="mb-4" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex-1">
          <h2 className="font-bold text-4xl text-morado pb-3.5">
            Order #{order.orderId}
          </h2>
          <p className="font-medium text-morado mb-8">Product detail</p>

          <div className="flex flex-col gap-6">
            {order.items.map((offer) => (
              <ShoppingCard
                key={offer.offerTitle}
                offer={offer}
                delete={() => console.log("Delete")}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <aside className="flex flex-col gap-5 border border-gray-200 rounded-2xl p-6 sticky top-4">
            <h3 className="text-4xl font-bold text-morado">Summary</h3>

            <div className="flex justify-between items-center pb-4 border-b border-gray">
              <span className="text-gray-600 font-semibold">Customer</span>
              <span className="font-semibold text-lg">
                {order.customerName}
              </span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray">
              <span className="text-gray-600 font-semibold">Pickup time</span>
              <p className="font-semiBold px-2.5 py-1 rounded-md bg-black text-white">
                14:00 PM - 16:00 PM
              </p>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray">
              <span className="text-gray-600 font-semibold">Subtotal</span>
              <span className="font-semibold text-lg">${order.total}</span>
            </div>

            <div className="flex flex-col justify-end gap-4 pb-4 border-b border-gray h-40">
              <p className="text-morado font-semibold">Pickup validation</p>
              <Input
              label=""
              name="code"
              placeholder="Enter code"
              type="text"
              />
            </div>

            <div className=" pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-morado">Total</span>
                <span className="text-xl font-bold">${order.total}</span>
              </div>
            </div>

            <Button
              onClick={() => {
                navigate("/seller/currentorders");
              }}
            >
              Validate Code
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
};
