import { ProgressBar } from "../components/ProgressBar";
import { Button } from "../components/Button";
import { useSellerSignup } from "../hooks/useSignup";
import { useForm } from "../hooks/useForm";
import { Input } from "../components/Input";
import { Availability } from "../components/Cards/Availability";
import { Map } from "../components/Map";

export const SignUpSeller = () => {
  const {
    registerSellerForm,
    setRegisterSellerForm,
    step,
    handleBack,
    handleNext,
    handleSubmit,
    handleAvailabilityChange,
  } = useSellerSignup();
  const { handleForm } = useForm<typeof registerSellerForm>();



  return (
    <main className="my-16 mx-6 md:mx-24 lg:mx-36 xl:mx-auto flex flex-col gap-8 max-w-7xl">
      <div className="flex flex-col gap-8 bg-azul py-6 px-10 rounded-2xl">
        <ProgressBar progress={step} />
        <div className="flex flex-col items-center md:flex-row gap-8">
          <img
            className="w-28 md:w-32"
            src="/Pera-blanco.svg"
            alt="Pera Logo"
          />
          <div className="flex flex-col gap-3 text-mainWhite">
            <h2 className="text-3xl font-bold">
              {step === 1
                ? `We need to know you :)`
                : step === 2
                ? `Where are you located?`
                : `Your time is yours`}
            </h2>
            <p className="md:text-lg">
              {step === 1
                ? `In Pera we always want to know more about your business so we can
                    match you up and meet your hopes an desires, please fill the
                    information below to continue.`
                : step === 2
                ? `We need this information for users to know where to get their food, trust us :)`
                : `Select the times users can be willing to show up and pick up the food.`}
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-morado text-3xl font-bold">Business Data</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-10"
      >
        {step === 1 ? (
          <>
            <Input
              label="Business Name"
              type="text"
              name="businessName"
              placeholder="e.g, Fresh Foods Market"
              value={registerSellerForm.businessName}
              onChange={(e) =>
                handleForm(e, setRegisterSellerForm, registerSellerForm)
              }
            />
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="freshfoodmarket@email.com"
              value={registerSellerForm.email}
              onChange={(e) =>
                handleForm(e, setRegisterSellerForm, registerSellerForm)
              }
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={registerSellerForm.password}
              onChange={(e) =>
                handleForm(e, setRegisterSellerForm, registerSellerForm)
              }
            />

            <div className="flex flex-col md:flex-row w-full items-center justify-between gap-3.5">
              <Input
                label="Phone Number"
                type="number"
                name="phone"
                placeholder="e.g.,  +57 304..."
                value={registerSellerForm.phone}
                onChange={(e) =>
                  handleForm(e, setRegisterSellerForm, registerSellerForm)
                }
              />
              <Input
                label="NIT"
                type="number"
                name="nit"
                placeholder="e.g.,  1234"
                value={registerSellerForm.nit}
                onChange={(e) =>
                  handleForm(e, setRegisterSellerForm, registerSellerForm)
                }
              />
            </div>
            <Input
              label="Category"
              type="text"
              name="category"
              placeholder="Select one of our categories"
              value={registerSellerForm.category}
              onChange={(e) =>
                handleForm(e, setRegisterSellerForm, registerSellerForm)
              }
            />
          </>
        ) : step === 2 ? (
          <>
            <Input
              label="Adress"
              type="text"
              name="address"
              placeholder="e.g, Fresh Foods Market"
              value={registerSellerForm.address}
              onChange={(e) =>
                handleForm(e, setRegisterSellerForm, registerSellerForm)
              }
            />
          <Map address={registerSellerForm.address} markerTitle={registerSellerForm.businessName}/>
          </>
        ) : (
          <section className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {registerSellerForm.availability.map(({ day, hours }) => (
              <Availability
                key={day}
                day={day}
                selectedHours={hours}
                onChange={(newHours) => handleAvailabilityChange(day, newHours)}
              />
            ))}
          </section>
        )}

        <div className="flex items-center gap-4">
          <Button secondary type="button" onClick={handleBack}>
            Go Back
          </Button>
          <Button type={step === 3 ? "submit" : "button"} onClick={handleNext}>
            {step === 3 ? "Send" : "Next"}
          </Button>
        </div>
      </form>
    </main>
  );
};
