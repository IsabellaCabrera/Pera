import { LoginForm } from "../components/Forms/LoginForm";

export const Login = () => {
  return (
    <section className="relative flex justify-center items-center sm:gap-14 md:gap-24 lg:gap-36  h-screen px-5 py-8 sm:px-10 md:px-16 lg:px-24">
      <div className="absolute bottom-0 hidden lg:block left-0 w-[48%] h-[340px] bg-amarillo -z-10 rounded-tr-[40px]" />

      <div className="hidden sm:block bg-[url(/LogInImg.webp)] bg-cover bg-center bg-no-repeat w-[40%] h-full rounded-[30px]" />
      <div className="flex-1">
        <LoginForm />
      </div>
    </section>
  );
};
