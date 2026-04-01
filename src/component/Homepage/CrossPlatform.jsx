import React from "react";
import "./CrossPlatform.css";

const CrossPlatform = () => {
  return (
    <section className="cp-cross">
      <div className="cp-container">
        <h1 className="cp-title">
          Cross-platform purchases <br />
          built better and faster
        </h1>

        <p className="cp-subtitle">
          With RevenueCat, the implementation and maintenance of purchases
          across mobile, Smart TV and web are simplified. Go to market quicker
          and spend less time supporting platform updates.
        </p>

        <div className="cp-grid">
          {/* LEFT COLUMN */}
          <div className="cp-column">
            {/* Card 1 */}
            <div className="cp-card cp-text-up">
              <img
                src="https://www.revenuecat.com/static/077fa905ad8d29d55e46e82a556d779b/da95e/first-image.webp"
                className="cp-card-img"
              />
              <h3>Your subscription backend-in-a-box.</h3>
              <p>
                RevenueCat simplifies purchase implementation and automates
                receipt validation for StoreKit, Google Play Billing, Smart TV
                and web transactions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="cp-card">
              <img
                src="https://www.revenuecat.com/static/third-image-676d4565c1eaf75867dbac16b94651b3.png"
                className="cp-card-img cp-card-img-cropped"
              />
              <h3>Seamless web purchases.</h3>
              <p>
                Easy online purchases that work on mobile—no coding or hosting
                needed.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="cp-column">
            {/* Card 2 */}
            <div className="cp-card cp-gradient">
              <div className="cp-logos">
                <img
                  src="https://www.revenuecat.com/static/apple-e2176114f1116b7782d99091dee3c73e.svg"
                  alt="apple"
                />
                <img
                  src="https://www.revenuecat.com/static/android-5589be03abd88e9fa62d823eff0956a3.svg"
                  alt="android"
                />
              </div>

              <h2>
                <span className="cp-blue">Just</span> one{" "}
                <span className="cp-green">API</span>
              </h2>
              <p>instead of one for each platform</p>
            </div>

            {/* Card 4 */}
            <div className="cp-card cp-text-up">
              <img
                src="https://www.revenuecat.com/static/fourth-image-b293a4f98e7af0adcc65cc5b82a02ced.png"
                className="cp-card-img"
              />
              <h3>Stay ahead of platform changes.</h3>
              <p>
                Our dedicated team of engineers handle updates, while you focus
                on developing features that matter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default CrossPlatform;