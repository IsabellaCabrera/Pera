import { Input } from "../Input";
import { useForm } from "../../hooks/useForm";
import { Button } from "../Button";
import { useOffer } from "../../hooks/useOffer";

export const CreateOfferForm = () => {
  const { offerForm, setOfferForm, handleSubmit } = useOffer();
  const { handleForm } = useForm<typeof offerForm>();

  return (
    <form
      className="flex flex-col lg:flex-row items-center justify-between h-dvh"
      onSubmit={handleSubmit}
    >
      <div className="bg-azul h-full w-full flex-1">
        <label>Offer Image</label>
        {/* <input
          type="file"
          onChange={(e) =>
            setOfferForm((prev) => ({
              ...prev,
              offerImg: e.target.files ? e.target.files[0] : null,
            }))
          }
        /> */}
      </div>

      <div className="w-full lg:w-1/2 p-10 flex flex-col gap-6">
        <h3 className="text-3xl font-bold text-morado">Create New Offer</h3>
        <Input
          label="Offer Title"
          name="offerTitle"
          type="text"
          placeholder="e.g., Fresh Bagels"
          value={offerForm.offerTitle}
          onChange={(e) => handleForm(e, setOfferForm, offerForm)}
          required
        />

        <div className="flex flex-col gap-2">
          <label className="font-medium">Description</label>
          <textarea
            className="focus:outline-none flex-1 placeholder:text-black/45 bg-mainWhite p-2 border border-morado/50 rounded-md"
            name="description"
            value={offerForm.description}
            onChange={(e) => handleForm(e, setOfferForm, offerForm)}
            required
          />
        </div>

        <div className="w-full flex flex-col lg:flex-row items-center gap-4">
          <Input
            label="Original Price"
            name="originalPrice"
            type="number"
            placeholder="$0.00"
            value={offerForm.originalPrice}
            onChange={(e) => handleForm(e, setOfferForm, offerForm)}
            required
          />

          <Input
            label="Pera Price"
            name="peraPrice"
            type="number"
            placeholder="$0.00"
            value={offerForm.peraPrice}
            onChange={(e) => handleForm(e, setOfferForm, offerForm)}
            required
          />
        </div>

        <Input
          label="Stock Quantity"
          name="stock"
          type="number"
          placeholder="e.g., 0"
          value={offerForm.stock}
          onChange={(e) => handleForm(e, setOfferForm, offerForm)}
          required
        />

        <div className="w-full flex flex-col lg:flex-row items-center gap-4">
          <Input
            label="Pickup Window Start"
            name="windowStart"
            type="text"
            placeholder="e.g., 14:00"
            value={offerForm.windowStart}
            onChange={(e) => handleForm(e, setOfferForm, offerForm)}
            required
          />

          <Input
            label="Pickup Window End"
            name="windowEnd"
            type="text"
            placeholder="e.g., 16:00"
            value={offerForm.windowEnd}
            onChange={(e) => handleForm(e, setOfferForm, offerForm)}
            required
          />
        </div>
        <Button type="submit">Create Offer</Button>
      </div>
    </form>
  );
};
