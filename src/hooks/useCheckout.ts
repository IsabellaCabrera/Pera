import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { clearCart } from "../redux/slices/productsSlice";
import { useNavigate } from "react-router";

export const useCheckout = () => {
  const [open, setOpen] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState("2");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [orderId, setOrderId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.products.cart);

  console.log(cart);

  const subtotal = Number(
    cart.reduce((acc, offer) => acc + (offer.peraPrice || 0), 0).toFixed(2)
  );

  const handleDonationChange = (donation: string) => {
    setSelectedDonation(donation);
  };

  const handlePaymentChange = (payment: string) => {
    setSelectedPayment(payment);
  };

  const generateOrderId = () => {
    const number = Math.floor(1000 + Math.random() * 9000);
    return `#${number}i`;
  };

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  const handlePay = async () => {
    if (!user?.uid) {
      console.error("⚠️ No hay usuario autenticado.");
      return;
    }

    const tempOrderId = generateOrderId();
    setOrderId(tempOrderId);
    handleModal();

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

  return {
    user,
    cart,
    open,
    handleModal,
    selectedDonation,
    selectedPayment,
    orderId,
    navigate,
    dispatch,
    subtotal,
    handleDonationChange,
    handlePaymentChange,
    handlePay
  };
};
