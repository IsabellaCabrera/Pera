import { PickupIcon } from "../../icons/PickupIcon";
import { PreparingIcon } from "../../icons/PreparingIcon";
import { ReadyIcon } from "../../icons/ReadyIcon";

export const Status = ({ ready, pickup }: { ready?: boolean, pickup? : boolean }) => {
  return (
    <div
      className={`w-fit p-2 flex items-center gap-1.5 ${ pickup ? "bg-azul/30" :
        ready ? "bg-verde/30" : "bg-amarillo/30"
      } rounded-md`}
    >
      <i>{pickup ? <PickupIcon/> : ready ? <ReadyIcon /> : <PreparingIcon />}</i>
      <p className={`${pickup? "text-azul"  : ready ? "text-verde" : "text-cafe"}`}>
        {pickup? "Waiting for pickup" : ready ? "Ready" : "Preparing"}
      </p>
    </div>
  );
};
