import type { ChangeEvent, Dispatch, SetStateAction } from "react";

export const useForm = <T extends object>() => {
  const handleForm = (
    e: ChangeEvent<HTMLInputElement>,
    setForm: Dispatch<SetStateAction<T>>,
    form: T
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return {
    handleForm,
  };
};
