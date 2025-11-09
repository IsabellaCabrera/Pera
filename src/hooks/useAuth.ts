import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { auth, db } from "../services/firebaseConfig";
import {
  clearUser,
  setError,
  setUser,
  startLoading,
} from "../redux/slices/authSlice";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);

        const unsubscribeUser = onSnapshot(
          userRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();

              dispatch(
                setUser({
                  uid: firebaseUser.uid,
                  ...userData,
                })
              );
            } else {
              dispatch(setError("El usuario no tiene datos en Firestore"));
            }
          },
          (error) => {
            dispatch(setError(error.message));
          }
        );

        return () => unsubscribeUser();
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribeAuth();
  }, [dispatch]);
};
