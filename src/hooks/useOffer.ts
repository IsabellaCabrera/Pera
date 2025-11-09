import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../services/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initialOfferForm = {
  offerTitle: "",
  description: "",
  originalPrice: "",
  peraPrice: "",
  stock: "",
  windowStart: "",
  windowEnd: "",
  offerImg: null as File | null,
};

export const useOffer = () => {
  const [offerForm, setOfferForm] = useState(initialOfferForm);
  const user = useSelector((state: RootState) => state.auth.user);

    const handleFileChange = (file: File | null) => {
    setOfferForm((prev) => ({ ...prev, offerImg: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("User not logged in");
      return;
    }

    try {
        let imageUrl = "";
        if (offerForm.offerImg) {
          const storageRef = ref(
            storage,
            `offers/${user.uid}/${offerForm.offerImg.name}`
          );
          await uploadBytes(storageRef, offerForm.offerImg);
          imageUrl = await getDownloadURL(storageRef);
        }

      const newOffer = {
        offerImg: imageUrl,
        offerTitle: offerForm.offerTitle,
        description: offerForm.description,
        originalPrice: Number(offerForm.originalPrice),
        peraPrice: Number(offerForm.peraPrice),
        stock: Number(offerForm.stock),
        windowStart: offerForm.windowStart,
        windowEnd: offerForm.windowEnd,
      };

      if (!user?.uid) return;
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        offers: arrayUnion(newOffer),
      });

      alert("Offer created successfully!");
      setOfferForm(initialOfferForm);
    } catch (err) {
      console.error("Error creating offer:", err);
      alert("Error creating offer, check console");
    }
  };
  return {
    offerForm,
    setOfferForm,
    handleFileChange,
    handleSubmit,
  };
};
