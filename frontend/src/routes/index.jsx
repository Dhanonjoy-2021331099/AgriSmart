import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Advice from "../pages/Advice";
import TipDetail from "../pages/TipDetail";
import AIDetection from "../pages/AIDetection";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import Tools from "../pages/Tools";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import MainLayout from "../layouts/MainLayout";
import AppProviders from "../providers/AppProviders";
import ProtectedClient from "../components/ProtectedClient";

function NotFound() {
  return (
    <div style={{ padding: "80px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>404</h1>
      <p>দুঃখিত, আপনার খোঁজা পেজটি পাওয়া যায়নি।</p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: (
      <AppProviders>
        <MainLayout />
      </AppProviders>
    ),
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/advice",
        element: (
          <ProtectedClient>
            <Advice />
          </ProtectedClient>
        ),
      },
      {
        path: "/tips/:slug",
        element: (
          <ProtectedClient>
            <TipDetail />
          </ProtectedClient>
        ),
      },
      {
        path: "/ai-detection",
        element: (
          <ProtectedClient>
            <AIDetection />
          </ProtectedClient>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedClient>
            <Products />
          </ProtectedClient>
        ),
      },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order-success", element: <OrderSuccess /> },
      {
        path: "/products/add",
        element: (
          <ProtectedClient>
            <AddProduct />
          </ProtectedClient>
        ),
      },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/admin", element: <Admin /> },
      { path: "/tools", element: <Tools /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/profile",
        element: (
          <ProtectedClient>
            <Profile />
          </ProtectedClient>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
