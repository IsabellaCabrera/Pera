import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { ShoppingCard } from "../components/Cards/Shopping";
import { Input } from "../components/Input";
import { Status } from "../components/Tags/Status";
import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import type { Order } from "../types/auth";

export const SellerOrder = () => {
  const [code, setCode] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const order = useSelector((state: RootState) => state.products.order);
  console.log(order);
  const navigate = useNavigate();

  const handleValidation = async () => {
    if (!order || !order.orderId) return;

    if (code.trim() !== order.orderCode) {
      alert("❌ Incorrect code");
      return;
    }

    try {
      if (!user?.uid) return;
      const sellerRef = doc(db, "users", user?.uid);
      const sellerSnap = await getDoc(sellerRef);
      const sellerData = sellerSnap.data();

      const updatedOrder = (sellerData?.orders || []).map((o: Order) =>
        o.orderId === order.orderId ? { ...o, status: "ready" } : o
      );

      await updateDoc(sellerRef, { orders: updatedOrder });

      alert("✅ Order marked as READY!");

      navigate("/seller/currentorders");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order");
    }
  };

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
              <span className="text-gray-600 font-semibold">Status</span>
              <Status
                pickup={order.status === "preparing"}
                ready={order.status === "ready"}
              />
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray">
              <span className="text-gray-600 font-semibold">Subtotal</span>
              <span className="font-semibold text-lg">${order.total}</span>
            </div>

            <div
              className={`${
                order.status === "ready" ? "hidden" : "block"
              } flex flex-col justify-end gap-4 pb-4 border-b border-gray h-40`}
            >
              <p className="text-morado font-semibold">Pickup validation</p>
              <div className="flex items-center gap-2 md:max-w-1/2 xl:max-w-1/3">
                <div className="cursor-default bg-morado/65 text-mainWhite py-2 px-4  rounded-md">
                  #
                </div>
                <Input
                  label=""
                  name="code"
                  placeholder="Enter code"
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                />
                <div className="cursor-default bg-morado/65 text-mainWhite py-2 px-4  rounded-md">
                  i
                </div>
              </div>
            </div>

            <div className=" pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-morado">Total</span>
                <span className="text-xl font-bold">${order.total}</span>
              </div>
            </div>
            <div
              className={` ${order.status === "ready" ? "hidden" : " block"}`}
            >
              <Button onClick={handleValidation}>Validate Code</Button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
