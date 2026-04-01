import React from "react";
import "./Landing.css";

const Landing = () => {
  return (
    <section className="landing">
      <div className="landing-container">
        <div className="landing-left">
          <h1>
            Build and grow
            <br />
            your app business
          </h1>

          <p>
            The world's best apps use RevenueCat to power purchases,
            manage customer data, and grow revenue on iOS, Android,
            and the web.
          </p>

          <div className="landing-action">
            <div className="email-box">
              <input
                type="email"
                placeholder="Your email address..."
              />
              <button>Start for free</button>
            </div>

            <a href="/">Talk to sales &gt;</a>
          </div>

          <div className="stats">
            <div>
              <h2>89,000</h2>
              <span>Apps trust RevenueCat</span>
            </div>

            <div>
              <h2>4B+</h2>
              <span>API requests daily</span>
            </div>

            <div>
              <h2>$13B+</h2>
              <span>Revenue processed annually</span>
            </div>
          </div>
        </div>

        <div className="landing-right">
          <img src="/Landing.png" alt="landing" />
        </div>
      </div>

      <div className="brand-strip">
        <img
          src="https://revenuecat.wpenginepowered.com/wp-content/uploads/2024/04/notion-logo.svg"
          alt="Notion"
        />
        <img
          src="https://revenuecat.wpenginepowered.com/wp-content/uploads/2024/12/openai-logo.svg"
          alt="OpenAI"
        />
        <img
          src="https://revenuecat.wpenginepowered.com/wp-content/uploads/2024/08/vsco-logo.svg"
          alt="VSCO"
        />
        <img
          src="https://revenuecat.wpenginepowered.com/wp-content/uploads/2025/12/ladder-logo-bar.svg"
          alt="Ladder"
        />
        <img
          src="https://revenuecat.wpenginepowered.com/wp-content/uploads/2025/12/runna-logo-bar-1.svg"
          alt="Runna"
        />
      </div>
    </section>
  );
};

export default Landing;