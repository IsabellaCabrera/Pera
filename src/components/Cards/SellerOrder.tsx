import { Link } from "react-router";
import type { Order } from "../../types/auth";
import { useDispatch } from "react-redux";
import { setOrder } from "../../redux/slices/productsSlice";
import { Status } from "../Tags/Status";

export const SellerOrderCard = ({
  order,
  number,
}: {
  order: Order;
  number: number;
}) => {
  const dispatch = useDispatch();

  return (
    <Link
      onClick={() => dispatch(setOrder(order))}
      to={`/seller/order/${order.orderId}`}
    >
      <article className="flex flex-col gap-3 p-3 bg-white rounded-2xl">
        <div className="w-full pb-2 border-b border-gray">
          <Status ready={order.status !== "preparing"} />
        </div>
        <img src="/defaultFoodImg.webp" alt="Order" />
        <div className="flex flex-col gap-1 text-morado">
          <h3 className="text-lg font-semibold text-Darkgray300">
            Order #{number}
          </h3>
          <p> {order.customerName} </p>
          <p className="flex items-center gap-2">
            Pickup time:
            <span className="font-semibold">11:30</span>
          </p>
          <p className="text-xl font-bold">${order.total}</p>
        </div>
      </article>
    </Link>
  );
};
