import { Link } from "react-router";
import { Button } from "../components/Button";
import { NavBar } from "../components/Header/NavBar";

export const Pickup = () => {
  return (
    <>
      <NavBar />
      <section className="relative flex flex-col md:flex-row justify-center items-center sm:gap-14 md:gap-24 lg:gap-36  h-screen px-5 py-8 sm:px-10 md:px-16 lg:px-24">
        {/* Rectángulo amarillo al fondo */}
        <div className="absolute bottom-0 hidden lg:block left-0 w-[48%] h-[340px] bg-amarillo -z-10 rounded-tr-[40px]" />

        <div className="flex gap-3 flex-1 flex-col  h-full py-32 ">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-semibold text-morado m-2.5">
              {" "}
              Your code
            </h2>
            <div className="flex gap-2 items-center">
              <p className="bg-Darkgray500 text-mainWhite text-3xl font-bold rounded-2xl p-5">
                1
              </p>
              <p className="bg-Darkgray500 text-mainWhite text-3xl font-bold rounded-2xl p-5">
                4
              </p>
              <p className="bg-Darkgray500 text-mainWhite text-3xl font-bold rounded-2xl p-5">
                4
              </p>
              <p className="bg-Darkgray500 text-mainWhite text-3xl font-bold rounded-2xl p-5">
                8
              </p>
              <p className="bg-Darkgray500 text-mainWhite text-3xl font-bold rounded-2xl p-5">
                i
              </p>
            </div>
          </div>

          <div className="hidden sm:block bg-[url(/MapImg.webp)] bg-cover bg-center bg-no-repeat w-full md:w-full h-full rounded-[30px] " />
        </div>

        <div className="flex-1 flex flex-col gap-16 md:pl-10 lg:pl-20">
          <div className="flex flex-col gap-6">
            <Link to={"/customer/home"}>
              <img
                className="h-[134px] w-[134px]"
                src="/public/Pera-Blue.svg"
                alt="Pera Logo"
              />
            </Link>
            <h1 className="text-3xl font-bold text-morado ">
              Your order is ready for you!
            </h1>
            <div className="border border-Darkgray200 rounded-3xl  flex flex-col gap-2 mb-6 p-7">
              <h2 className="text-2xl font-medium text-Darkgray200">
                Pickup location
              </h2>
              <p className="text-[16px] font-normal text-Darkgray200">
                Avenida Cañas Gordas con 109 Calle 18
              </p>
            </div>
            <Button>Open in maps</Button>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-medium  text-Darkgray200  ">
              Pickup instructions
            </h2>
            <p className="text-[16px] font-normal text-Darkgray200">
              {" "}
              Show your pickup code to the staff at the location. They will
              verify your purchase and hand over your order. Please ensure you
              arrive within the specified pickup window.
            </p>
            <Button secondary>Contact store</Button>
          </div>
        </div>
      </section>
    </>
  );
};
