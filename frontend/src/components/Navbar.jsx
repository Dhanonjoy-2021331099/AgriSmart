import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut as firebaseSignOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import { useAppSettings } from "../Contexts/AppSettingsContext";
import { useCart } from "../Contexts/CartContext";
import { useAuth } from "../Contexts/AuthProvider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language, theme, toggleLanguage, toggleTheme, getText } =
    useAppSettings();
  const { totals } = useCart();
  const { token, logout, user } = useAuth();
  const isLoggedIn = !!token;

  const handleLogout = async () => {
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch (error) {
        console.error("Firebase sign out error:", error);
      }
    }

    logout();
    toast.success(
      getText("সফলভাবে লগআউট করা হয়েছে।", "Successfully logged out.")
    );
    navigate("/");
  };

  // Translations
  const translations = {
    bangla: {
      home: "হোম",
      aiDetection: "এআই শনাক্তকরণ",
      advice: "পরামর্শ",
      products: "পণ্য",
      addProduct: "পণ্য যুক্ত করুন",
      profile: "প্রোফাইল",
      login: "লগইন",
      register: "নিবন্ধন",
      logout: "লগআউট",
      title: "Agri Smart",
      cart: "কার্ট",
    },
    english: {
      home: "Home",
      aiDetection: "AI Detection",
      advice: "Advice",
      products: "Products",
      addProduct: "Add Product",
      profile: "Profile",
      login: "Login",
      register: "Register",
      logout: "Logout",
      title: "Agri Smart",
      cart: "Cart",
    },
  };

  const validLanguage =
    language === "bangla" || language === "english" ? language : "bangla";
  const t = translations[validLanguage] || translations.bangla;

  const headerStyle = {
    background: theme === "dark" ? "#0f0f0f" : "#cbbd93",
    color: "#ffffff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
    borderBottom:
      theme === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
  };

  return (
    <header className="navbar-header" style={headerStyle}>
      <div className="navbar-container">
        {/* Logo and Title */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="navbar-logo">🌾</div>
          <span className="navbar-title">{t.title}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {t.home}
          </NavLink>
          <NavLink
            to="/ai-detection"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {t.aiDetection}
          </NavLink>
          <NavLink
            to="/advice"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {t.advice}
          </NavLink>
          <NavLink
            to="/products"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {t.products}
          </NavLink>
          <NavLink
            to="/products/add"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {t.addProduct}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            🛒 {t.cart} {totals?.itemsCount ? `(${totals.itemsCount})` : ""}
          </NavLink>
        </nav>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* User Control Area - Desktop */}
          <div className="user-controls-desktop">
            {/* Language Toggle Card */}
            <div className="control-card">
              <button
                onClick={toggleLanguage}
                className="control-btn language-control"
                aria-label="Toggle Language"
                title={
                  validLanguage === "bangla"
                    ? "Switch to English"
                    : "বাংলায় পরিবর্তন করুন"
                }
              >
                <svg
                  className="control-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 0 1 6.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="control-label">
                  {validLanguage === "bangla" ? "EN" : "বাংলা"}
                </span>
              </button>
            </div>

            {/* Theme Toggle Card */}
            <div className="control-card">
              <button
                onClick={toggleTheme}
                className="control-btn theme-control"
                aria-label="Toggle Dark Mode"
                title={
                  theme === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                }
              >
                {theme === "dark" ? (
                  <svg
                    className="control-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg
                    className="control-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Profile Button - Desktop */}
            {isLoggedIn && (
              <div className="control-card profile-card">
                <Link
                  to="/profile"
                  className="control-btn profile-btn"
                  title="View your profile"
                >
                  <svg
                    className="control-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="control-label">{t.profile}</span>
                </Link>
              </div>
            )}

            {/* Logout Button - Desktop */}
            {isLoggedIn && (
              <div className="control-card logout-card">
                <button
                  onClick={handleLogout}
                  className="control-btn logout-btn"
                  title="Logout from your account"
                >
                  <svg
                    className="control-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9" />
                  </svg>
                  <span className="control-label">{t.logout}</span>
                </button>
              </div>
            )}

            {/* Login & Register - Desktop */}
            {!isLoggedIn && (
              <>
                <div className="control-card login-card">
                  <Link
                    to="/login"
                    className="control-btn login-btn"
                    title="Login to your account"
                  >
                    <svg
                      className="control-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-5-4l5-5-5-5m5 5H3" />
                    </svg>
                    <span className="control-label">{t.login}</span>
                  </Link>
                </div>
                <div className="control-card register-card">
                  <Link
                    to="/register"
                    className="control-btn register-btn"
                    title="Create new account"
                  >
                    <svg
                      className="control-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" />
                      <line x1="23" y1="11" x2="17" y2="11" />
                    </svg>
                    <span className="control-label">{t.register}</span>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-btn mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          className="navbar-nav mobile-nav"
          style={{
            background: theme === "dark" ? "#0f0f0f" : "#1a1a1a",
          }}
        >
          {/* Mobile User Controls */}
          <div className="mobile-user-controls">
            {/* Language Toggle - Mobile */}
            <div className="control-card mobile-control">
              <button
                onClick={toggleLanguage}
                className="control-btn language-control"
                aria-label="Toggle Language"
              >
                <svg
                  className="control-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 0 1 6.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="control-label">
                  {validLanguage === "bangla" ? "EN" : "বাংলা"}
                </span>
              </button>
            </div>

            {/* Theme Toggle - Mobile */}
            <div className="control-card mobile-control">
              <button
                onClick={toggleTheme}
                className="control-btn theme-control"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? (
                  <svg
                    className="control-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg
                    className="control-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
                <span className="control-label">
                  {theme === "dark" ? "Light" : "Dark"}
                </span>
              </button>
            </div>
          </div>

          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.home}
          </NavLink>
          <NavLink
            to="/ai-detection"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.aiDetection}
          </NavLink>
          <NavLink
            to="/advice"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.advice}
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.products}
          </NavLink>
          <NavLink
            to="/products/add"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.addProduct}
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t.profile}
            </NavLink>
          )}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="nav-link login-mobile"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="auth-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-5-4l5-5-5-5m5 5H3" />
                </svg>
                {t.login}
              </Link>
              <Link
                to="/register"
                className="nav-link register-mobile"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="auth-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                {t.register}
              </Link>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="nav-link logout-mobile"
            >
              <svg
                className="logout-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9" />
              </svg>
              {t.logout}
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
