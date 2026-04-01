import React from "react";
import "./PaywallSection.css";

const PaywallSection = () => {
  return (
    <section className="paywall">
      <div className="container">
        
        <div className="top-content">
          <h1>
            Build, target & test <br />
            paywalls that convert
          </h1>
          <p>
            Turn-key tools for monetizing and growing your app.
          </p>
        </div>

    
        <div className="paywall-grid">

          <div className="left">
            <h2>
              Launch faster <br />
              with pre-built, <br />
              configurable templates
            </h2>
            <p>
              Designed to impress, built to customize—our paywall templates are
              yours to shape. You have full control with our intuitive
              layer-driven editor.
            </p>
          </div>

          <div className="right">
            <div className="image-wrapper">
              <img
                src="/download.png"
                alt="paywall-ui"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PaywallSection;