import { useState } from "react";
import type { UserData } from "../../types/auth";
import { Input } from "../Input";
import { useForm } from "../../hooks/useForm";
import { UploadFile } from "../UploadFile";
import { Button } from "../Button";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



export const EditCustomerProfileForm = ({ user }: { user: UserData }) => {
  const initialEditUserForm = {
    name: user.name,
    email: user.email,
    profileImg: null as File | null,
  };

  const [editUserForm, setEditUserForm] = useState(initialEditUserForm);
  const [loading, setLoading] = useState(false);
  const { handleForm } = useForm<typeof editUserForm>();

  const handleFileChange = (file: File | null) => {
    setEditUserForm((prev) => ({ ...prev, profileImg: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userRef = doc(db, "users", user.uid);
      const updatedData: Partial<UserData> = {
        name: editUserForm.name,
        email: editUserForm.email,
      };

      if (editUserForm.profileImg) {
        const imgRef = ref(storage, `users/${user.uid}/profileImg`);
        await uploadBytes(imgRef, editUserForm.profileImg);
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
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <UploadFile onChange={handleFileChange} />
      <Input
        label="Name"
        type="text"
        name="name"
        placeholder={user.name || "Enter your Full Name"}
        autoComplete="current-name"
        value={editUserForm.name}
        onChange={(e) => handleForm(e, setEditUserForm, editUserForm)}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder={user.email || "Enter your Email"}
        autoComplete="current-email"
        value={editUserForm.email}
        onChange={(e) => handleForm(e, setEditUserForm, editUserForm)}
        required
      />
      <Button secondary disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};


// export const EditCustomerProfileForm = ({ user }: { user: UserData }) => {
//     const initialEditUserForm = {
//       name: user.name,
//       email: user.email,
//       profileImg: null as File | null,
//     };
//     const [editUserForm, setEditUserForm] = useState(initialEditUserForm);
//   const { handleForm } = useForm<typeof editUserForm>();

//   const handleFileChange = (file: File | null) => {
//     setEditUserForm((prev) => ({ ...prev, profileImg: file }));
//   };

//   return (
//     <form className="flex flex-col items-center gap-4">
//       <UploadFile onChange={handleFileChange} />
//       <Input
//         label="Name"
//         type="text"
//         name="name"
//         placeholder={user.name || "Enter your Full Name"}
//         autoComplete="current-name"
//         value={editUserForm.name}
//         onChange={(e) => handleForm(e, setEditUserForm, editUserForm)}
//         required
//       />
//       <Input
//         label="Email Address"
//         type="email"
//         name="email"
//         placeholder={user.email || "Enter your Email"}
//         autoComplete="current-email"
//         value={editUserForm.email}
//         onChange={(e) => handleForm(e, setEditUserForm, editUserForm)}
//         required
//       />
//       <Button secondary>Save Changes</Button>
//     </form>
//   );
// };
