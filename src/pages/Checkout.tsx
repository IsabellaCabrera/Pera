import { useState } from "react";
import { ShoppingCard } from "../components/Cards/Shopping";
import { Button } from "../components/Button";
import { Summary } from "../components/Forms/Summary";
import { useNavigate } from "react-router";

const products = [
  {
    id: 1,
    image: "/public/classicfamilybreakfast.webp",
    title: "Classic Family Breakfast",
    description:
      "Wake up to a breakfast meal with a warm biscuit, fluffy scrambled eggs, savory McDonald's sausage and crispy golden Hash Browns.",
    add: { number: 1 },
    price: 2400,
  },
  {
    id: 2,
    image: "/public/eggburger.webp",
    title: "Classic Egg Burger",
    description:
      "A delicious egg burger with a fluffy egg patty, savory sausage, and melted cheese.",
    add: { number: 1 },
    price: 900,
  },
];

export const Checkout = () => {
  const [selectedDonation, setSelectedDonation] = useState("2");
  const [selectedPayment, setSelectedPayment] = useState("card");

  const navigate = useNavigate()

  const subtotal = products.reduce(
    (total, product) => total + product.price,
    0
  );

  const handleDonationChange = (donation: string) => {
    setSelectedDonation(donation);
  };

  const handlePaymentChange = (payment: string) => {
    setSelectedPayment(payment);
  };

  const handlePay = () => {
    console.log("Processing payment...", { selectedPayment, selectedDonation });
  };

  

  return (
    <section className="py-9 px-12">
      <div className="mb-8">
        <Button onClick={()=> navigate(-1)} secondary>Go back</Button>
      </div>

      <img src="/Pera-morado.svg" alt="Loopa Logo" className="mb-4" />

      <div className="grid grid-cols-2 gap-8">
        <div className="flex-1">
          <h2 className="font-bold text-4xl text-morado pb-3.5">
            Shopping cart
          </h2>
          <p className="font-medium text-morado mb-8">Product detail</p>

          <div className="flex flex-col gap-6">
            {products.map((product) => (
              <ShoppingCard key={product.id} {...product} delete={() => {}} />
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
