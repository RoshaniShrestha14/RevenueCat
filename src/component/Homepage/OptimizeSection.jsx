import React, { useEffect, useState } from "react";
import "./OptimizeSection.css";

const images = ["/First.png", "/Second.png", "/Third.png"];

const OptimizeSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="optimize-section">
      <div className="left-container">
        <img
          src={images[currentImage]}
          alt="animated"
          className={`animated-image ${visible ? "show" : "hide"}`}
        />
      </div>

      <div className="right-container">
        <h1>
          Optimize for
          <br />
          every audience
        </h1>
        <p>
          Tailor how you monetize your app. Target your paywalls,
          pricing, and packaging by audience segments and in-app
          placement.
        </p>
        <a href="/">Learn about segmentation with Targeting &gt;</a>
      </div>
    </section>
  );
};

export default OptimizeSection;