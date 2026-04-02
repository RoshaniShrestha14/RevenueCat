import React from "react";
import "./CaseStudyHighlight.css";

const CaseStudyHighlight = () => {
  return (
    <section className="case-highlight">
      <div className="case-highlight-container">
        <div className="case-highlight-logo-wrap">
          <img
            src="https://revenuecat.wpenginepowered.com/wp-content/uploads/2025/07/Pixelcut-1-150x150.png"
            alt="Case study logo"
            className="case-highlight-logo"
          />
        </div>

        <div className="case-highlight-content">
          <p>
            "Finding a variant that produces a <span>16% increase</span> in
            subscribers definitely makes RevenueCat worth it."
          </p>
          <a href="#">Read case study &gt;</a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHighlight;