import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useAppSettings } from "../Contexts/AppSettingsContext";

export default function Footer() {
  const { getText } = useAppSettings();
  const t = (bn, en) => getText(bn, en);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Column 1: Logo & About */}
        <div className="footer-column footer-about">
          <div className="footer-logo">
            <span className="footer-logo-icon">🌾</span>
            <h3 className="footer-logo-text">Agri Smart</h3>
          </div>
          <p className="footer-description">
            {t(
              "আধুনিক প্রযুক্তির মাধ্যমে কৃষি ব্যবস্থাপনাকে সহজ ও লাভজনক করে তুলছি।",
              "Making agriculture management simple and profitable through modern technology."
            )}
          </p>
          <div className="footer-contact">
            <div className="footer-contact-item">
              <Phone size={18} />
              <span>01783-062908 <br /> 01903912471</span>
            
            </div>
            <div className="footer-contact-item">
              <Mail size={18} />
              <span>2021331099@student.sust.edu <br />2021331051@student.sust.edu</span>
              
            </div>
            <div className="footer-contact-item">
              <MapPin size={18} />
              <span>{t("সিলেট, বাংলাদেশ", "Sylhet, Bangladesh")}</span>
            </div>
          </div>
          <div className="footer-social">
            <a href="#" className="footer-social-link" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="footer-social-link" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="footer-social-link" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="footer-social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h4 className="footer-heading">{t("দ্রুত লিংক", "Quick Links")}</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">{t("হোম", "Home")}</Link>
            </li>
            <li>
              <Link to="/products">{t("পণ্য", "Products")}</Link>
            </li>
            <li>
              <Link to="/ai-detection">
                {t("এআই শনাক্তকরণ", "AI Detection")}
              </Link>
            </li>
            <li>
              <Link to="/advice">{t("পরামর্শ", "Advice")}</Link>
            </li>
            <li>
              <Link to="/profile">{t("প্রোফাইল", "Profile")}</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-column">
          <h4 className="footer-heading">{t("সেবাসমূহ", "Services")}</h4>
          <ul className="footer-links">
            <li>
              <Link to="/ai-detection">
                {t("রোগ শনাক্তকরণ", "Disease Detection")}
              </Link>
            </li>
            <li>
              <Link to="/advice">
                {t("কৃষি পরামর্শ", "Agricultural Advice")}
              </Link>
            </li>
            <li>
              <Link to="/products">{t("পণ্য বিক্রয়", "Product Sales")}</Link>
            </li>
            <li>
              <Link to="/tools">{t("আধুনিক সরঞ্জাম", "Modern Tools")}</Link>
            </li>
            <li>
              <Link to="/cart">{t("কার্ট", "Shopping Cart")}</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div className="footer-column">
          <h4 className="footer-heading">{t("রিসোর্স", "Resources")}</h4>
          <ul className="footer-links">
            <li>
              <a href="#">{t("সাহায্য কেন্দ্র", "Help Center")}</a>
            </li>
            <li>
              <a href="#">{t("গোপনীয়তা নীতি", "Privacy Policy")}</a>
            </li>
            <li>
              <a href="#">{t("শর্তাবলী", "Terms & Conditions")}</a>
            </li>
            <li>
              <a href="#">{t("ডকুমেন্টেশন", "Documentation")}</a>
            </li>
            <li>
              <a href="#">{t("যোগাযোগ", "Contact Us")}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            © {currentYear} Agri Smart —{" "}
            {t("React ও Vite দিয়ে নির্মিত", "Built with React & Vite")}
          </p>
        </div>
      </div>
    </footer>
  );
}
