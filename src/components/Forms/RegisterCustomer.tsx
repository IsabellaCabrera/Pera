import { useForm } from "../../hooks/useForm";
import { Link } from "react-router";
import { Button } from "../Button";
import { Input } from "../Input";
import { useSignup } from "../../hooks/useSignup";

export const RegisterCustomer = () => {
  const { signupForm, setSignupForm, handleSubmit } = useSignup();
  const { handleForm } = useForm<typeof signupForm>();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
      <Link to={"/"}>
        {" "}
        <img src="/PeraLogo-amarillo.svg" alt="Pera logo" />
      </Link>
      <div>
        <h2 className=" text-4xl font-bold text-morado">Create an account!</h2>
        <p>
          Start exploring a new world of possibilities with incredible offers
          while taking care of our planet.
        </p>
      </div>
      <span className="h-[1px] bg-morado/20"> </span>
      <div className=" flex flex-col gap-4">
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          autoComplete="current-name"
          value={signupForm.name}
          onChange={(e) => handleForm(e, setSignupForm, signupForm)}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          autoComplete="current-email"
          value={signupForm.email}
          onChange={(e) => handleForm(e, setSignupForm, signupForm)}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={signupForm.password}
          onChange={(e) => handleForm(e, setSignupForm, signupForm)}
          required
        />
      </div>
      <Button type="submit">Sign up</Button>
      <p className="flex items-center gap-2">
        Already have an account?
        <span className="text-morado underline">
          <Link to={"/login"}>Log in</Link>
        </span>
      </p>
    </form>
  );
};
// en el boton uso el use navagte porque como no tiene navegacion propia porque no es una etiqueta link entonces traemos el ooh y le damos navegacion
// eso es navegacion programatica
