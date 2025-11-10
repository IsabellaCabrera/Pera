import { ReadyIcon } from "../../icons/ReadyIcon";

export const Status = ({ ready }: { ready: boolean }) => {
  return (
    <div
      className={`w-fit p-2 flex items-center gap-1.5 ${
        ready ? "bg-verde/30" : "bg-amarillo/30"
      } rounded-md`}
    >
      <i>{ready ? <ReadyIcon /> : ""}</i>
      <p className={`${ready ? "text-verde" : "text-cafe"}`}>
        {ready ? "Ready" : "Preparing"}
      </p>
    </div>
  );
};
