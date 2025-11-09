import { useState } from "react";
import { Toggle } from "../Toggle";
import type { AvailabilityProps } from "../../types/cards";

const hoursList = [
  "6:00 AM - 12:00 PM",
  "12:00 PM - 4:00 PM",
  "4:00 PM - 8:00 PM",
  "8:00 PM - 12:00 AM",
];

export const Availability = ({
  day,
  selectedHours,
  onChange,
}: AvailabilityProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleSelect = (hour: string) => {
    const newHours = selectedHours.includes(hour)
      ? selectedHours.filter((h) => h !== hour)
      : [...selectedHours, hour];
    onChange(newHours);
  };
  return (
    <article
      className={`${
        isOpen
          ? "border border-gray"
          : "border border-gray/30 bg-LightGray100 h-fit"
      } flex flex-col gap-4  py-3 px-6 rounded-2xl transition-all`}
    >
      <div className="flex items-center justify-center gap-3">
        <p className="font-medium text-lg text-gray-800">{day}</p>
        <Toggle checked={isOpen} onChange={setIsOpen} />
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2">
          {hoursList.map((hour) => {
            return (
              <button
                key={hour}
                type="button"
                onClick={() => handleSelect(hour)}
                className={`cursor-pointer font-light px-2 py-3.5 rounded-xl transition-all ${
                  selectedHours.includes(hour)
                    ? "bg-black text-white"
                    : "bg-gray text-black hover:bg-gray-400"
                }`}
              >
                {hour}
              </button>
            );
          })}
        </div>
      )}
    </article>
  );
};
