import React from "react";
import "./TrustedSection.css";

const TrustedSection = () => {
  return (
    <section className="trusted-section">
      <p className="trusted-title">
        RevenueCat is trusted by developers globally
      </p>

      <div className="cards-container">
        <div className="trust-card card-blue">
          <h2>4.8<span>/ 5</span></h2>
          <p>Capterra rating</p>
        </div>

        <div className="trust-card card-red">
          <h2>4.8<span>/ 5</span></h2>
          <p>G2 rating</p>
        </div>

        <div className="trust-card card-green">
          <img
            src="https://www.revenuecat.com/static/soc2-1e1e0a2ff0be7d74ccba396a38b7b9cb.png"
            alt="SOC2"
          />
          <p>SOC2 Certified</p>
        </div>

        <div className="trust-card card-purple">
          <img
            src="https://www.revenuecat.com/static/gdpr-815baf226e89ebf48c29be717156cd2b.png"
            alt="GDPR"
          />
          <p>GDPR Compliant</p>
        </div>
      </div>

      <div className="trusted-cta-section">
        <h1>Ready to grow?</h1>
        <p>
          Our entire suite of features comes standard and it's free to get
          started.
        </p>

        <div className="trusted-cta-buttons">
          <button className="trusted-start-btn">Start for free</button>
          <a href="/">Talk to sales &gt;</a>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;