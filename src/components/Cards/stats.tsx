import type { StatCardProps } from "../../types/cards";

export const StatCard = ({stat, title}:StatCardProps) => {
  return (
    <article
      className="py-2.5 px-4 flex flex-col gap-6 bg-white rounded-xl"
    >
      <img className="w-8 h-8 bg-azul rounded-md" src="" alt="" />
      <div>
        <h3 className="text-Darkgray500 font-bold text-2xl">{stat}</h3>
        <p className="text-Darkgray200 text-sm">{title}</p>
      </div>
    </article>
  );
};
