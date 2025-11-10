import { useState } from "react";
import { ShoppingCard } from "../components/Cards/Shopping";
import { Button } from "../components/Button";
import { Summary } from "../components/Forms/Summary";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { clearCart, deleteFromCart } from "../redux/slices/productsSlice";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const Checkout = () => {
  const [selectedDonation, setSelectedDonation] = useState("2");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.products.cart);

  console.log(cart);

  const navigate = useNavigate();

  const subtotal = Number(
    cart.reduce((acc, offer) => acc + (offer.peraPrice || 0), 0).toFixed(2)
  );

  const handleDonationChange = (donation: string) => {
    setSelectedDonation(donation);
  };

  const handlePaymentChange = (payment: string) => {
    setSelectedPayment(payment);
  };


  const handlePay = async () => {
    if (!user?.uid) {
      console.error("⚠️ No hay usuario autenticado.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);

      //  Guardar orden en el usuario

      const newOrder = {
        orderId: crypto.randomUUID(),
        items: cart,
      };

      await updateDoc(userRef, {
        orders: arrayUnion(newOrder),
      });

      // Agrupar items por restaurante
      const groupedByRestaurant = cart.reduce((acc, item) => {
        const restaurantId = item.restaurantId;
        if (!acc[restaurantId]) acc[restaurantId] = [];
        acc[restaurantId].push(item);
        return acc;
      }, {} as Record<string, typeof cart>);

      // Crear una orden en cada restaurante
      for (const [restaurantId, items] of Object.entries(groupedByRestaurant)) {
        const total = Number(
          items
            .reduce((acc, offer) => acc + (offer.peraPrice || 0), 0)
            .toFixed(2)
        );

        const restaurantRef = doc(db, "users", restaurantId);
        const restaurantOrder = {
          orderId: crypto.randomUUID(),
          customerId: user.uid,
          customerName: user.name,
          items,
          total,
          createdAt: new Date().toISOString(),
        };

        await updateDoc(restaurantRef, {
          orders: arrayUnion(restaurantOrder),
        });
      }

      console.log("✅ Orden guardada en usuario y restaurantes.");
      dispatch(clearCart());
    } catch (error) {
      console.error("❌ Error al guardar orden:", error);
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

      <div className="grid grid-cols-2 gap-8">
        <div className="flex-1">
          <h2 className="font-bold text-4xl text-morado pb-3.5">
            Shopping cart
          </h2>
          <p className="font-medium text-morado mb-8">Product detail</p>

          <div className="flex flex-col gap-6">
            {cart.map((offer) => (
              <ShoppingCard
                key={offer.offerTitle}
                offer={offer}
                delete={() => dispatch(deleteFromCart(offer.offerTitle))}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <Summary
            subtotal={subtotal}
            selectedDonation={selectedDonation}
            selectedPayment={selectedPayment}
            onDonationChange={handleDonationChange}
            onPaymentChange={handlePaymentChange}
            onPay={handlePay}
          />
        </div>
      </div>
    </section>
  );
};
