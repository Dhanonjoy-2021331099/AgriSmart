import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase/firebase.config';
import { useAppSettings } from '../Contexts/AppSettingsContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language, theme, toggleLanguage, toggleTheme, getText } = useAppSettings();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = async () => {
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch (error) {
        console.error('Firebase sign out error:', error);
      }
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast.success(getText('সফলভাবে লগআউট করা হয়েছে।', 'Successfully logged out.'));
    navigate('/');
  };

  // Translations
  const translations = {
    bangla: {
      home: 'হোম',
      aiDetection: 'এআই শনাক্তকরণ',
      advice: 'পরামর্শ',
      products: 'পণ্য',
      addProduct: 'পণ্য যুক্ত করুন',
      profile: 'প্রোফাইল',
      login: 'লগইন',
      register: 'নিবন্ধন',
      logout: 'লগআউট',
      title: 'Agri Smart'
    },
    english: {
      home: 'Home',
      aiDetection: 'AI Detection',
      advice: 'Advice',
      products: 'Products',
      addProduct: 'Add Product',
      profile: 'Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      title: 'Agri Smart'
    }
  };

  const validLanguage = (language === 'bangla' || language === 'english') ? language : 'bangla';
  const t = translations[validLanguage] || translations.bangla;

  const headerStyle = {
    background: theme === 'dark' ? '#0f0f0f' : '#1a1a1a',
    color: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
  };

  return (
    <header className="navbar-header" style={headerStyle}>
      <div className="navbar-container">
        {/* Logo and Title */}
        <Link to="/" className="navbar-brand" onClick={() => setIsMenuOpen(false)}>
          <div className="navbar-logo">🌾</div>
          <span className="navbar-title">{t.title}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t.home}
          </NavLink>
          <NavLink to="/ai-detection" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t.aiDetection}
          </NavLink>
          <NavLink to="/advice" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t.advice}
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t.products}
          </NavLink>
          <NavLink to="/products/add" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t.addProduct}
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t.profile}
            </NavLink>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="navbar-btn language-btn"
            aria-label="Toggle Language"
          >
            {validLanguage === 'bangla' ? 'EN' : 'বাংলা'}
          </button>

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleTheme}
            className="navbar-btn theme-btn"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="navbar-btn login-btn" onClick={() => setIsMenuOpen(false)}>
                {t.login}
              </Link>
              <Link to="/register" className="navbar-btn register-btn" onClick={() => setIsMenuOpen(false)}>
                {t.register}
              </Link>
            </>
          ) : (
            <button 
              onClick={handleLogout}
              className="navbar-btn logout-btn"
            >
              {t.logout}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="navbar-btn mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="navbar-nav mobile-nav" style={{
          background: theme === 'dark' ? '#0f0f0f' : '#1a1a1a'
        }}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.home}
          </NavLink>
          <NavLink 
            to="/ai-detection" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.aiDetection}
          </NavLink>
          <NavLink 
            to="/advice" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.advice}
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.products}
          </NavLink>
          <NavLink 
            to="/products/add" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.addProduct}
          </NavLink>
          {isLoggedIn && (
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.profile}
            </NavLink>
          )}
          {!isLoggedIn && (
            <>
              <Link 
                to="/login" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.login}
              </Link>
              <Link 
                to="/register" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
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
              className="nav-link logout-link"
            >
              {t.logout}
            </button>
          )}
        </nav>
      )}

    </header>
  );
}
