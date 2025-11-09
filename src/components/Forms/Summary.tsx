import { useNavigate } from "react-router";
import type { SummaryProps } from "../../types/summary";
import { RadioGroup } from "../Inputs/RadioGroup";
import { Button } from "../Button";

export const Summary = ({
  subtotal,
  selectedDonation,
  selectedPayment,
  onDonationChange,
  onPaymentChange,
  onPay,
}: SummaryProps) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    let donationAmount = 0;

    if (selectedDonation === "2") {
      donationAmount = 2;
    } else if (selectedDonation === "5") {
      donationAmount = 5;
    } else if (selectedDonation === "round") {
      const rounded = Math.ceil(subtotal / 100) * 100;
      donationAmount = rounded - subtotal;
    }

return  Number(subtotal + donationAmount).toFixed(2)

  };

  // const formatPrice = (price: number): string => {
  //   return `$${(price / 100).toLocaleString()}`;
  // };

  const donationOptions = [
    { value: "2", label: "$2" },
    { value: "5", label: "$5" },
    { value: "round", label: "Round up" },
  ];

  const paymentOptions = [
    { value: "card", label: "Card" },
    { value: "cash", label: "Cash" },
  ];

  return (
    <aside className="flex flex-col border border-gray-200 rounded-2xl p-6 sticky top-4">
      <h3 className="text-2xl font-bold text-morado mb-6">Summary</h3>

      {/* Subtotal */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
        <span className="text-gray-600 font-semibold">Subtotal</span>
        <span className="font-semibold text-lg">${subtotal}</span>
      </div>

      {/* Donation Section - Ahora usando RadioGroup */}
      <RadioGroup
        title="Donation"
        options={donationOptions}
        selectedValue={selectedDonation}
        onChange={onDonationChange}
        name="donation"
      />

      {/* Payment Method - Ahora usando RadioGroup */}
      <RadioGroup
        title="Payment"
        options={paymentOptions}
        selectedValue={selectedPayment}
        onChange={onPaymentChange}
        name="payment"
      />

      {/* Total */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-morado">Total</span>
          <span className="text-xl font-bold">
            ${calculateTotal()}
          </span>
        </div>
      </div>

      {/* Pay Button */}
      <Button
        onClick={() => {
          onPay();
          navigate("/customer/order/pickup");
        }}
      >
        Pay
      </Button>
    </aside>
  );
};
