import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { auth, db } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { setError, setUser } from "../redux/slices/authSlice";
import type { AvailabilityItem, SellerForm } from "../types/signup";

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

const initialDays: AvailabilityItem[] = [
  { day: "Mon", hours: [] },
  { day: "Tue", hours: [] },
  { day: "Wed", hours: [] },
  { day: "Thu", hours: [] },
  { day: "Fri", hours: [] },
  { day: "Sat", hours: [] },
  { day: "Sun", hours: [] },
];

const initialRegisterSellerForm: SellerForm = {
  businessName: "",
  email: "",
  password: "",
  phone: "",
  nit: "",
  category: "",
  address: "",
  availability: initialDays,
};

export const useSellerSignup = () => {
  const [registerSellerForm, setRegisterSellerForm] = useState(
    initialRegisterSellerForm
  );
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleAvailabilityChange = (day: string, hours: string[]) => {
    setRegisterSellerForm((prev) => ({
      ...prev,
      availability: prev.availability.map((item) =>
        item.day === day ? { ...item, hours } : item
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerSellerForm.availability.some((day) => day.hours.length > 0))
      return;

    const openDays = registerSellerForm.availability.filter(
      (d) => d.hours.length > 0
    );

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        registerSellerForm.email,
        registerSellerForm.password
      );

      await updateProfile(userCredentials.user, {
        displayName: registerSellerForm.businessName,
      });

      const userRef = doc(db, "users", userCredentials.user.uid);
      const newUser = {
        name: registerSellerForm.businessName,
        email: registerSellerForm.email,
        phone: registerSellerForm.phone,
        nit: registerSellerForm.nit,
        profileImge: "",
        category: registerSellerForm.category,
        address: registerSellerForm.address,
        role: "seller",
        availability: openDays,
      };
      await setDoc(userRef, newUser);

      dispatch(setUser(newUser))
      navigate("/seller/analytics");

      console.log("✅ Seller registrado:", {
        ...registerSellerForm,
        availability: openDays,
      });

    } catch (error) {
      console.error("Error creando seller:", error);
    }
  };

  return {
    step,
    handleNext,
    handleBack,
    handleSubmit,
    registerSellerForm,
    setRegisterSellerForm,
    handleAvailabilityChange,
  };
};
