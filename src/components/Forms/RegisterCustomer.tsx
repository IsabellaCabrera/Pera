import { Link } from "react-router";
import { Button } from "../Button";
import { Input } from "../Input";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { setError, setUser } from "../../redux/slices/authSlice";

const initialSignUpForm = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export const RegisterCustomer = () => {
  const [signupForm, setSignupForm] = useState(initialSignUpForm);
  const { handleForm } = useForm<typeof signupForm>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(signupForm);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        signupForm.email,
        signupForm.password
      );
      await updateProfile(userCredentials.user, {
        displayName: signupForm.name,
      });

      const userRef = doc(db, "users", userCredentials.user.uid);
      const newUser = {
        name: signupForm.name,
        email: signupForm.email,
        role: signupForm.role,
        profileImg: "",
      };
      await setDoc(userRef, newUser);
      dispatch(setUser(newUser));
      navigate("/customer/home");
    } catch (error) {
      console.error("Error creating user", error);

      dispatch(setError("Error SignUp"));
    }
    setSignupForm(initialSignUpForm);
  };

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
