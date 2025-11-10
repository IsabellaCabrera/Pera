import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Button } from "../components/Button";
import { clearUser } from "../redux/slices/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router";
import { NavBar } from "../components/Header/NavBar";
import { EditCustomerProfileForm } from "../components/Forms/EditCustomerProfile";
import type { UserData } from "../types/auth";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);



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
    <>
      <NavBar />
      <div className="m-6 flex justify-end">
        <Button secondary onClick={logout}>Log out</Button>
      </div>
      <main className="my-2 px-6 mx-auto max-w-2xl flex flex-col justify-center gap-4">
        <div className="flex flex-col items-center">
        <img
          className="w-32 rounded-full"
          src={user?.profileImg || "/avatar.png"}
          alt={user?.name}
          />
        <p>{user?.name}</p>
        <p>{user?.email}</p>
          </div>
      <EditCustomerProfileForm user={user as UserData} />
      </main>
    </>
  );
};
