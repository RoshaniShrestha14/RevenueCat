import React, { useState } from "react";
import "./TeamTools.css";

const cardsData = [
  {
    title: "Engineering",
    text: "Stop spending time on platform updates and edge cases — build great features instead.",
    img: "https://www.revenuecat.com/static/engineering-a8d55598aba9617af0973318641dd354.svg",
    color: "#e0e7ff",
  },
  {
    title: "Marketing",
    text: "Grow revenue with a single source of truth for your subscription data that connects with your existing marketing stack.",
    img: "https://www.revenuecat.com/static/marketing-bb96ccd9c75c149cd3e025e5651ce5c4.svg",
    color: "#ffe4e6",
  },
  {
    title: "Product",
    text: "Streamline your product's growth with easy management of pricing, paywalls, and A/B tests, backed by actionable data.",
    img: "https://www.revenuecat.com/static/support-402642994c0c1048ba1ef75ef71c90fd.svg",
    color: "#dcfce7",
  },
  {
    title: "Support",
    text: "Provide better customer support with a unified view of subscriptions, making it easy to resolve issues and tailor support.",
    img: "https://www.revenuecat.com/static/support-402642994c0c1048ba1ef75ef71c90fd.svg",
  },
  {
    title: "Data teams",
    text: "Free your data team from ad-hoc requests, troubleshooting, and double-checking accuracy.",
    img: "https://www.revenuecat.com/static/database-a8b18a5633825cd3c01558507e09cacb.svg",
  },
  {
    title: "Leadership",
    text: "Make better decisions with an accurate view of the performance of your subscription business.",
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSPQD07mV0ZgEuLOBgPmAb46-Oi37xGW9yK5eTRurHsge5e0CRs",
  },
];

const TeamTools = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="team-tools">
      <h2>Data and tools for every team</h2>
      <p>
        Make reliable cross-platform data and easy-to-use growth tools
        accessible to everyone.
      </p>

      <div className="cards">
        {cardsData.map((card, i) => (
          <div
            className={`card ${active === i ? "active" : ""}`}
            key={i}
            onClick={() => setActive(i)}
          >
            <div className="icon" style={{ background: card.color }}>
              <img src={card.img} alt={card.title} />
            </div>

            <h3>{card.title}</h3>
            <p>{card.text}</p>

            <span className="link">
              For {card.title.toLowerCase()} teams &gt;
            </span>
          </div>
        ))}
      </div>

      <div className="slider">
        {cardsData.map((_, i) => (
          <div
            key={i}
            className={`dot ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamTools;