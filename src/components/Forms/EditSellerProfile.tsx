import { useState } from "react";
import type { UserData } from "../../types/auth";
import { Input } from "../Input";
import { useForm } from "../../hooks/useForm";
import { UploadFile } from "../UploadFile";
import { Button } from "../Button";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const EditSellerProfileForm = ({ user }: { user: UserData }) => {
  const initialEditSellerForm = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    nit: user.nit,
    address: user.address,
    category: user.category,
    profileImg: null as File | null,
  };

  const [editSellerForm, setEditSellerForm] = useState(initialEditSellerForm);
  const [loading, setLoading] = useState(false);
  const { handleForm } = useForm<typeof editSellerForm>();

  const handleFileChange = (file: File | null) => {
    setEditSellerForm((prev) => ({ ...prev, profileImg: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userRef = doc(db, "users", user.uid);
      const updatedData: Partial<UserData> = {
        name: editSellerForm.name,
        email: editSellerForm.email,
        phone: editSellerForm.phone,
        nit: editSellerForm.nit,
        address: editSellerForm.address,
        category: editSellerForm.category,
      };

      if (editSellerForm.profileImg) {
        const imgRef = ref(storage, `users/${user.uid}/profileImg`);
        await uploadBytes(imgRef, editSellerForm.profileImg);
        const downloadURL = await getDownloadURL(imgRef);
        updatedData.profileImg = downloadURL;
      }

      await updateDoc(userRef, updatedData);

      console.log("✅ Usuario actualizado con éxito:", updatedData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error al actualizar el perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      <UploadFile onChange={handleFileChange} />
      <Input
        label="Name"
        type="text"
        name="name"
        placeholder={user.name || "Enter your Full Name"}
        autoComplete="current-name"
        value={editSellerForm.name}
        onChange={(e) => handleForm(e, setEditSellerForm, editSellerForm)}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder={user.email || "Enter your Email"}
        autoComplete="current-email"
        value={editSellerForm.email}
        onChange={(e) => handleForm(e, setEditSellerForm, editSellerForm)}
        required
      />
      <Input
        label="Phone Number"
        type="number"
        name="phone"
        placeholder={user.phone || "Enter your Phone Number"}
        autoComplete="current-phone"
        value={editSellerForm.phone}
        onChange={(e) => handleForm(e, setEditSellerForm, editSellerForm)}
        required
      />
      <Input
        label="NIT"
        type="number"
        name="nit"
        placeholder={user.nit || "Enter your Nit"}
        autoComplete="current-nit"
        value={editSellerForm.nit}
        onChange={(e) => handleForm(e, setEditSellerForm, editSellerForm)}
        required
      />
      <Input
        label="Category"
        type="text"
        name="category"
        placeholder={user.category || "Enter your Category"}
        autoComplete="current-category"
        value={editSellerForm.category}
        onChange={(e) => handleForm(e, setEditSellerForm, editSellerForm)}
        required
      />
      <Button secondary disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};
