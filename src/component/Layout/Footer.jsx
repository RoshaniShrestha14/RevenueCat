import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter, FaMastodon } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT SECTION */}
        <div className="footer-left">
          {/* Logo */}
          <Link to="/" className="logo-section">
            <img src="/logo.svg" alt="RevenueCat" />
          </Link>

          {/* Social Icons */}
          <nav>
            <ul className="footer-social">
              <li>
                <a
                  href="https://github.com/RevenueCat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="icon" />
                  <span className="sr-only">Github</span>
                </a>
              </li>

              <li>
                <a
                  href="https://x.com/revenuecat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="icon" />
                  <span className="sr-only">X (formerly Twitter)</span>
                </a>
              </li>

              <li>
                <a
                  href="https://mastodon.social/@revenuecat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaMastodon className="icon" />
                  <span className="sr-only">Mastodon</span>
                </a>
              </li>
            </ul>
          </nav>

          <p className="footer-copy">© 2026 RevenueCat</p>
        </div>

        {/* RIGHT GRID */}
        <div className="footer-grid">
          <FooterColumn
            title="Resources"
            links={[
              "Press Kit",
              "Careers",
              "Blog",
              "Podcast",
              "Customer Stories",
              "Partners",
              "Help Center",
              "Contact",
            ]}
          />

          <FooterColumn
            title="Documentation"
            links={[
              "Quickstart Guide",
              "Migration Guide",
              "SDKs",
              "API Reference",
              "Sample Apps",
              "System Status",
              "View All Docs",
            ]}
          />

          <FooterColumn
            title="Product"
            links={[
              "Why RevenueCat",
              "Integrations",
              "For Engineering Teams",
              "For Marketing Teams",
              "For Product Teams",
              "Pricing",
              "verifyReceipt tool",
              "Changelog",
            ]}
          />

          <FooterColumn
            title="Legal"
            links={[
              "Privacy Policy",
              "Terms and Conditions",
              "GDPR",
              "Security and Compliance",
              "Fair Billing Policy",
            ]}
          />
        </div>
      </div>
    </footer>
  );
};

/* Reusable Column Component */
const FooterColumn = ({ title, links }) => {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <ul>
        {links.map((item, i) => (
          <li key={i}>
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
