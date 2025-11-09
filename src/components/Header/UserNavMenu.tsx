import { NavItems } from "./NavItems";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Link } from "react-router";

// Esto son los links que lleva el navbar del user pero del costumer
const customerNavItems = [
  {
    id: crypto.randomUUID(),
    link: "customer/home",
    label: "Home",
  },
  {
    id: crypto.randomUUID(),
    link: "customer/history&savings",
    label: "history & savings",
  },
  {
    id: crypto.randomUUID(),
    link: "customer/checkout",
    label: "Cart",
  },
];

// Esto son los links que lleva el navbar del user pero del seller

const sellerNavItems = [
  {
    id: crypto.randomUUID(),
    link: "seller/analytics",
    label: "Analytics",
  },

  {
    id: crypto.randomUUID(),
    link: "seller/orders",
    label: "Orders",
  }
];

export const UserNavMenu = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      {user?.role === "customer"
        ? customerNavItems.map(({ id, link, label }) => (
            <NavItems key={id} link={link} label={label} />
          ))
        : sellerNavItems.map(({ id, link, label }) => (
            <NavItems key={id} link={link} label={label} />
          ))}
      <Link to={"/profile"}>
        <img
          className="w-8 h-8 rounded-full"
          src={user?.profileImg || "/avatar.png"}
          alt="Profile Image"
        />
      </Link>
    </>
  );
};
