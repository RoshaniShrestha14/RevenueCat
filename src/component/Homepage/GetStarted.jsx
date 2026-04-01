import React from "react";
import "./GetStarted.css";

const logos = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg",
];

const logoByCell = {
  2: logos[6],
  4: logos[5],
  5: logos[7],
  9: logos[1],
  10: logos[4],
  13: logos[0],
  16: logos[3],
  17: logos[2],
};

const gridCells = Array.from({ length: 24 }, (_, index) => index + 1);

const GetStarted = () => {
  return (
    <>
      <section className="get-started">
        <div className="get-started-container">
          {/* LEFT */}
          <div className="text-content">
            <h2>Get started in minutes</h2>
            <p>
              Only pay when you earn. Usage-based pricing starts after you reach
              $2,500 in monthly tracked revenue.
            </p>
            <a href="#" className="docs-link">See the docs →</a>
          </div>

          {/* RIGHT */}
          <div className="logo-grid">
            {gridCells.map((cell) => (
              <div className="logo-box" key={cell}>
                {logoByCell[cell] ? (
                  <img src={logoByCell[cell]} alt="logo" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pixery-section">
        <div className="pixery-container">
          <div className="pixery-logo-card">
            <img
              src="https://revenuecat.wpenginepowered.com/wp-content/uploads/2024/06/pixery.svg"
              alt="Pixery"
            />
          </div>

          <div className="pixery-content">
            <h3>
              Learn how Pixery gets back <span>6000+</span>
              <br />
              engineerings hours per year with
              <br />
              RevenueCat.
            </h3>
            <a href="#" className="pixery-link">Read case study &gt;</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetStarted;