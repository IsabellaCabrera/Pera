import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { auth, db } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { setError, setUser } from "../redux/slices/authSlice";

const initialSignUpForm = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export const useSignup = () => {
  const [signupForm, setSignupForm] = useState(initialSignUpForm);
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

  return {
    signupForm,
    setSignupForm,
    handleSubmit,
  };
};
