import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";

const initialLoginForm = {
  email: "",
  password: "",
};
export const useLogin = () => {
  const [loginForm, setLoginForm] = useState(initialLoginForm);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );

      const userDoc = await getDoc(doc(db, "users", response.user.uid));
      if (userDoc.exists()) {
        const user = userDoc.data();
        dispatch(
          setUser({
            uid: response.user.uid,
            email: response.user.email || "",
            name: user.name,
            profileImg: user.profileImg,
            role: user.role,
            products: user.products || [],
            orders: user.orders || [],
          })
        );
        navigate(
          user.role === "seller" ? "/seller/analytics" : "/customer/home"
        );
      } else {
        alert("Error user not found");
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    loginForm,
    setLoginForm,
    handleSubmit,
  };
};
