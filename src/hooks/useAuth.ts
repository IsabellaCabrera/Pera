import { useEffect, useRef } from "react";
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
  const currentUid = useRef<string | null>(null);

  useEffect(() => {
    dispatch(startLoading());

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Guardamos el id actual y solo escuchamos ese usuario (documento)
        currentUid.current = firebaseUser.uid;

        const userRef = doc(db, "users", firebaseUser.uid);

        const unsubscribeUser = onSnapshot(
          userRef,
          (docSnap) => {
            // Solo actualizamos si cambia el usuario actual
            if (firebaseUser.uid !== currentUid.current) return;

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
        currentUid.current = null;
        dispatch(clearUser());
      }
    });

    return () => unsubscribeAuth();
  }, [dispatch]);
};
