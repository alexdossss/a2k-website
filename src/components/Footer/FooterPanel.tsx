import { Link } from "react-router-dom";
import "./FooterPanel.css";

function FooterPanel() {
  return (
    <footer>
      <div className="footer-container">
        <ul className="footer-links font-inter">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/services">SERVICES</Link>
          </li>
        </ul>

        <div className="footer-logo-container">
          <img
            src="/icons/a2k_icon.png"
            alt="A2K Group Logo"
            className="a2k-logo"
          />
        </div>

        <p className="footer-copyright font-inter">© 2026 A2K Group Corporation. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default FooterPanel;
