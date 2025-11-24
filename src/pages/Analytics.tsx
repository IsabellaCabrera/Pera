import { Link } from "react-router";
import { Button } from "../components/Button";
import { NavBar } from "../components/Header/NavBar";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { StatCard } from "../components/Cards/stats";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { OrderCard } from "../components/Cards/Order";

const stats = [
  {
    id: crypto.randomUUID(),
    title: "Revenue recovered",
    stat: "$12.000",
  },
  {
    id: crypto.randomUUID(),
    title: "Orders delivered",
    stat: "150",
  },
  {
    id: crypto.randomUUID(),
    title: "Offers sold out",
    stat: "75",
  },
  {
    id: crypto.randomUUID(),
    title: "Donations made",
    stat: "10",
  },
];

export const Analytics = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(user?.orders);

  const totalRevenue =
    user?.orders?.reduce((acc, order) => acc + order.total, 0) ?? 0;

  const revenueData =
    user?.orders?.map((order) => ({
      name: `Order  #${order.orderCode}`,
      revenue: order.total,
    })) ?? [];

  const allItems = user?.orders?.flatMap((order) => order.items);

  const itemsCountMap = allItems?.reduce((items, item) => {
    const key = item.offerTitle;
    items[key] = (items[key] || 0) + 1;
    return items;
  }, {} as Record<string, number>);

  const ordersData = Object.entries(itemsCountMap ?? {}).map(
    ([name, orders]) => ({
      name,
      orders,
    })
  );
  return (
    <>
      <NavBar />
      <main className="flex flex-col gap-14 py-4 md:py-8 lg:py-16 px-6 md:px-12 lg:px-20">
        <h1 className="text-2xl font-bold text-morado">Dashboard</h1>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-Darkgray500 w-full py-5 px-6 rounded-2xl">
          <div>
            <h2 className="text-mainWhite text-4xl">
              Hi there, <br />
              <span className="font-semibold">{user?.name}🙌</span>
            </h2>
            <p className="text-Darkgray200">
              Track & manage your business here
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(({ id, title, stat }) => (
              <StatCard key={id} title={title} stat={stat} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Grafico 1 */}

          <div className="border border-azul rounded-xl">
            <div className="p-4 border border-gray-200 rounded-xl ">
              <h3 className="font-semibold text-gray-800 mb-1">
                Revenue by Order
              </h3>
              <p className="text-3xl font-bold">${totalRevenue}</p>
              <p className="text-sm text-gray-500 mb-4">
                Last 30 Days{" "}
                <span className="text-morado font-semibold">+10%</span>
              </p>

              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <XAxis dataKey="name" tick={{ fill: "#6366F1" }} />
                    <YAxis hide />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366F1"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Grafico 2 */}

          <div className="border border-azul rounded-xl">
            <div className="p-4 border border-gray-200 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-1">
                Items by Orders
              </h3>
              <p className="text-3xl font-bold">{user?.orders?.length}</p>
              <p className="text-sm text-gray-500 mb-4">
                Last 30 Days{" "}
                <span className="text-morado font-semibold">+5%</span>
              </p>

              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ordersData} barSize={40}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: "#6366F1" }} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar
                      dataKey="orders"
                      fill="#FACC15"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Ofertas */}

          <div className="flex flex-col gap-4 py-2.5 px-4 bg-gray rounded-xl">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold text-2xl text-morado">Your Offers</h3>
              <Link to={"/seller/offer/createoffer"}>
                <Button>New Offer</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user?.offers?.map((offer) => (
                <OrderCard offer={offer} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
