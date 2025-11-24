import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Signup";
import { SignUpCustomer } from "./pages/SignupCustomer";
import { SignUpSeller } from "./pages/SignupSeller";
import { Restaurante } from "./pages/Restaurante";
import { Pickup } from "./pages/Pickup";
import { Home } from "./pages/Home";
import { Checkout } from "./pages/Checkout";
import { useAuthListener } from "./hooks/useAuth";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Analytics } from "./pages/Analytics";
import { CreateOffer } from "./pages/CreateOffer";
import { HistorySavings } from "./pages/HistorySavings";
import { ProfileSeller } from "./pages/profileSeller";
import { CurrentOrders } from "./pages/CurrentOrders";
import { SellerOrder } from "./pages/SellerOrder";

function App() {
  useAuthListener();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/customer" element={<SignUpCustomer />} />
          <Route path="/signup/seller" element={<SignUpSeller />} />

          {/* Seller */}

          <Route element={<ProtectedRoute requiredRole="seller" />}>
            <Route path="/seller/analytics" element={<Analytics />} />
            <Route path="/seller/offer/createoffer" element={<CreateOffer />} />
            <Route path="/seller/profile" element={<ProfileSeller />} />
            <Route path="/seller/currentorders" element={<CurrentOrders />} />
            <Route path="/seller/order/:order" element={<SellerOrder />} />
          </Route>

          {/* Customer es el usario que va comprar  */}

          <Route element={<ProtectedRoute requiredRole="customer" />}>
            <Route path="/customer/home" element={<Home />} />
            <Route path="/customer/:restaurant" element={<Restaurante />} />
            <Route path="/customer/checkout" element={<Checkout />} />
            <Route
              path="/customer/order/:orderId/pickup"
              element={<Pickup />}
            />

            <Route
              path="/customer/history&savings"
              element={<HistorySavings />}
            />
            <Route path="/customer/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
