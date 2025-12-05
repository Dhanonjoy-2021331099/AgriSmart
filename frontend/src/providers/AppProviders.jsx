import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AppSettingsProvider,
  useAppSettings,
} from "../Contexts/AppSettingsContext";
import { CartProvider } from "../Contexts/CartContext";
import { AuthProvider } from "../Contexts/AuthProvider";

function InnerProviders({ children }) {
  const { theme } = useAppSettings();

  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        closeOnClick
        draggable={false}
        pauseOnHover
        newestOnTop
        theme={theme === "dark" ? "dark" : "light"}
      />
    </>
  );
}

InnerProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AppProviders({ children }) {
  return (
    <AppSettingsProvider>
      <AuthProvider>
        <CartProvider>
          <InnerProviders>{children}</InnerProviders>
        </CartProvider>
      </AuthProvider>
    </AppSettingsProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
