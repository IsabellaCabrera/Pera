import { ShoppingCard } from "../components/Cards/Shopping";
import { Button } from "../components/Button";
import { Summary } from "../components/Forms/Summary";
import { Modal } from "../components/Modal";
import { useCheckout } from "../hooks/useCheckout";
import { clearCart, deleteFromCart } from "../redux/slices/productsSlice";

export const Checkout = () => {
  const {
    cart,
    subtotal,
    selectedDonation,
    selectedPayment,
    orderId,
    handleDonationChange,
    handlePaymentChange,
    handlePay,
    open,
    handleModal,
    navigate,
    dispatch,
  } = useCheckout();

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
      {open && (
        <Modal open={open} onClose={handleModal}>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl font-bold text-morado">
              Payment succesful!
            </h2>
            <img className="max-w-[330px]" src="/default.png" alt="Img" />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl font-bold text-Darkgray300">
                Thank you for your order
              </h3>
              <p className="text-Darkgray200">
                Your payment of <strong>${subtotal}</strong> was succesful,
                we’ll be waiting for you to pick your food up.
              </p>
              <h3 className="text-3xl font-bold text-morado mb-4">
                Order ID: #{orderId}i
              </h3>
              <Button
                className="self-center"
                onClick={() => {
                  navigate(`/customer/order/${orderId}/pickup`);
                  dispatch(clearCart());
                }}
              >
                View pickup guide
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
