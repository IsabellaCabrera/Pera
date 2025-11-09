import { useState } from "react";
import { ShoppingCard } from "../components/Cards/Shopping";
import { Button } from "../components/Button";
import { Summary } from "../components/Forms/Summary";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { clearCart, deleteFromCart } from "../redux/slices/productsSlice";

export const Checkout = () => {
  const [selectedDonation, setSelectedDonation] = useState("2");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const dispatch = useDispatch();

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

  const handlePay = () => {
    dispatch(clearCart())
    console.log("Processing payment...", { selectedPayment, selectedDonation });
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
