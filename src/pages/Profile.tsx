import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Button } from "../components/Button";
import { clearUser } from "../redux/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const user = useSelector((state: RootState) => state.auth.user);

  if (isLoading) return <p>isLoading...</p>;

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <main>
      <h1>Profile : {user?.name}</h1>
      <p>uid : {user?.uid}</p>
      <Button onClick={logout}>Log out</Button>
    </main>
  );
};
