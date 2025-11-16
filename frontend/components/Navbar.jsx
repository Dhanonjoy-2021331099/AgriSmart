'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('bangla');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Check for saved language preference
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'bangla' || savedLang === 'english')) {
      setLanguage(savedLang);
    } else {
      // Ensure default is set
      setLanguage('bangla');
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    const newLang = language === 'bangla' ? 'english' : 'bangla';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  // Translations
  const translations = {
    bangla: {
      home: 'হোম',
      aiDetection: 'এআই শনাক্তকরণ',
      advice: 'পরামর্শ',
      products: 'পণ্য',
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
      profile: 'Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      title: 'Agri Smart'
    }
  };

  // Ensure language is valid, default to 'bangla' if not
  const validLanguage = (language === 'bangla' || language === 'english') ? language : 'bangla';
  const t = translations[validLanguage] || translations.bangla;

  const headerStyle = {
    background: isDarkMode ? '#0f0f0f' : '#1a1a1a',
    color: '#ffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
  };

  return (
    <header className="navbar-header" style={headerStyle}>
      <div className="navbar-container">
        {/* Logo and Title */}
        <Link href="/" className="navbar-brand">
          <div className="navbar-logo">🌾</div>
          <span className="navbar-title">{t.title}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-nav">
          <Link 
            href="/" 
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            {t.home}
          </Link>
          <Link 
            href="/ai-detection" 
            className={`nav-link ${pathname === '/ai-detection' ? 'active' : ''}`}
          >
            {t.aiDetection}
          </Link>
          <Link 
            href="/advice" 
            className={`nav-link ${pathname === '/advice' ? 'active' : ''}`}
          >
            {t.advice}
          </Link>
          <Link 
            href="/products" 
            className={`nav-link ${pathname === '/products' ? 'active' : ''}`}
          >
            {t.products}
          </Link>
          {isLoggedIn && (
            <Link 
              href="/profile" 
              className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}
            >
              {t.profile}
            </Link>
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
            onClick={toggleDarkMode}
            className="navbar-btn theme-btn"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <>
              <Link href="/login" className="navbar-btn login-btn">
                {t.login}
              </Link>
              <Link href="/register" className="navbar-btn register-btn">
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
          background: isDarkMode ? '#0f0f0f' : '#1a1a1a'
        }}>
          <Link 
            href="/" 
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.home}
          </Link>
          <Link 
            href="/ai-detection" 
            className={`nav-link ${pathname === '/ai-detection' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.aiDetection}
          </Link>
          <Link 
            href="/advice" 
            className={`nav-link ${pathname === '/advice' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.advice}
          </Link>
          <Link 
            href="/products" 
            className={`nav-link ${pathname === '/products' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t.products}
          </Link>
          {isLoggedIn && (
            <Link 
              href="/profile" 
              className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.profile}
            </Link>
          )}
          {!isLoggedIn && (
            <>
              <Link 
                href="/login" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.login}
              </Link>
              <Link 
                href="/register" 
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

      <style jsx>{`
        .navbar-header {
          color: var(--navbar-text, #ffffff);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
          font-weight: 700;
          font-size: 20px;
        }

        .navbar-logo {
          font-size: 28px;
        }

        .navbar-title {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .desktop-nav {
          display: none;
        }

        .nav-link {
          padding: 10px 16px;
          text-decoration: none;
          color: var(--navbar-text, #ffffff);
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 15px;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          color: white;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .navbar-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.1);
          color: var(--navbar-text, #ffffff);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .navbar-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .language-btn,
        .theme-btn {
          min-width: 50px;
          font-size: 18px;
        }

        .login-btn {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .register-btn {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          color: white;
        }

        .logout-btn {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        .mobile-menu-btn {
          display: block;
          font-size: 24px;
          min-width: 44px;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 10px;
          background: var(--navbar-bg, #1a1a1a);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-link {
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          width: 100%;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }

          .mobile-menu-btn {
            display: none;
          }

          .mobile-nav {
            display: none;
          }
        }

        @media (max-width: 767px) {
          .navbar-container {
            padding: 0 15px;
            height: 60px;
          }

          .navbar-brand {
            font-size: 18px;
          }

          .navbar-logo {
            font-size: 24px;
          }

          .login-btn,
          .register-btn {
            display: none;
          }

          .language-btn,
          .theme-btn {
            min-width: 44px;
            padding: 6px 12px;
          }
        }
      `}</style>
    </header>
  );
}
