import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavigationPanel.css";

function NavigationPanel() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <nav>
      <div className="font-inter navigation-panel container">
        <div className="logo-container">
          <img
            src="/icons/a2k_icon.png"
            alt="A2K Group Logo"
            className="a2k-logo"
          />
        </div>

        <div className="grouped-links-container container">
          <ul className="grouped-links">
            <li>
              <Link to="/">Home</Link>
              <svg
                className="dropdown-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
              <svg
                className="dropdown-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </li>
            <li>
              <Link to="/services">Services</Link>
              <svg
                className="dropdown-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </li>
            <li>
              <Link to="/workflow">Workflow</Link>
              <svg
                className="dropdown-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </li>
            <li>
              <Link to="/services">Team</Link>
              <svg
                className="dropdown-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </li>

            <button
              className="theme-toggle"
              aria-label="Toggle Theme"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
          </ul>
        </div>

        <Link to="/contact" className="contact-btn container">
          <span className="status-dot"></span>
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default NavigationPanel;
