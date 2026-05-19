import { memo } from "react";
import { Link } from "react-router-dom";
import "./FooterPanel.css";

const FOOTER_LINKS = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/services", label: "SERVICES" },
] as const;

function FooterPanel() {
  return (
    <footer>
      <div className="footer-container">
        <ul className="footer-links font-inter">
          {FOOTER_LINKS.map(({ to, label }) => (
            <li key={label}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>

        <div className="footer-logo-container">
          <img src="/icons/a2k_icon.png" alt="A2K Group Logo" className="a2k-logo" width="40" height="40" />
        </div>

        <p className="footer-copyright font-inter">© 2026 A2K Group Corporation. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default memo(FooterPanel);
