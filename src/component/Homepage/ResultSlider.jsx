import React, { useState } from "react";
import "./ResultSlider.css";

const cards = [
  {
    company: "Photoroom",
    subtitle: "Studio Photo Editor",
    quote:
      "RevenueCat is at the center of our stack for subscriptions. It enables us to have one single source of truth for subscriptions and revenue data and then allows us to spread that reliable data across all of the great integrations RevenueCar has with the rest of our marketing and analytics stack.",
    person: "Olivier Lemarié",
    role: "Head of Growth and Marketing",
    stat1: "2–3x",
    stat1Text: "trial rates in Japan",
    stat2: "50%",
    stat2Text: "increase in upsell screen conversions",
    logo: "https://revenuecat.wpenginepowered.com/wp-content/uploads/2024/04/photoroom.svg",
    profile: "https://www.revenuecat.com/static/85f53c470f5495b387c2b31c66baaa17/1e43f/olivier-lemarie.webp",
  },
  {
    company: "ChatGPT",
    subtitle: "AI-Powered Conversational Assistant",
    quote:
      "With RevenueCat, we never had to slow down. They made it easy to keep our focus on building the best product while ensuring our mission of accessible, safe AI for everyone.",
    person: "Sara Conlon",
    role: "Head of Finance Engineering",
    stat1: "#1",
    stat1Text: "in the U.S. App Store within 24 hours",
    stat2: "",
    stat2Text: "",
    logo: "https://revenuecat.wpenginepowered.com/wp-content/uploads/2024/12/openai-logomark-expanded.png",
    profile: "https://www.revenuecat.com/static/abafbb5f2a91c1441a7b193dba018db7/1e43f/sara-conlon.webp",
  },
  {
    company: "CardPointers",
    subtitle: "Credit Card Optimization",
    quote:
      "In just a year from shipping with RevenueCat, I was able to quit my day job to focus 100% on CardPointers. I've continued to grow and expand, all thanks to RevenueCat.",
    person: "Emmanuel Crouvisier",
    role: "Founder",
    stat1: "~27%",
    stat1Text: "saved in app store fees",
    stat2: "",
    stat2Text: "",
    logo: "https://revenuecat.wpenginepowered.com/wp-content/uploads/2024/04/card-pointers.svg",
    profile: "https://www.revenuecat.com/static/c5ca26238b68637f3e335c4ea8307ca5/1e43f/emmanuel-crouvisier.webp",
  },
    {
    company: "The Tapping Solution",
    subtitle: "EMotional Freedom Techniques",
    quote:
      "(RevenueCat) really solved a lot of problems for us and I would do it again in a heartbeat. If I ever work on launching another app, I will include RevenueCat from the beginning.",
    person: "Kelly Plummer",
    role: "Director ",
    stat1: "50%",
    stat1Text: "reduction in backend engineering hours",
    stat2: "3.6%",
    stat2Text: "of users won back with new Braze campaigns",
    logo: "https://revenuecat.wpenginepowered.com/wp-content/uploads/2023/09/the-tapping-solution-1.png",
    profile: "https://www.revenuecat.com/static/301a6ba4ff4890b4766f9e0d9c324236/1e43f/kelly-plummer.webp",
  },
  {
    company: "Pixery",
    subtitle: "Next generation mobile apps for content creators",
    quote:
      "We realized that implementing and maintaining in-app purchases ourselves had taken too much time and resources. You need dedicated people and when they leave it's difficult to replace and transition that knowledge.",
    person: "Kemal Ugur",
    role: "Co-founder & CEO",
    stat1: "20%",
    stat1Text: "engineering capacity freed",
    stat2: "6x",
    stat2Text: "faster experimentation",
    logo: "https://revenuecat.wpenginepowered.com/wp-content/uploads/2024/04/pixery.svg",
    profile: "https://www.revenuecat.com/static/e72d97b7a485aaaa0e67188cd600388d/1e43f/kemal-ugur.webp",
  },
  {
    company: "VSCO",
    subtitle: "Photo Filter App",
    quote:
      "The RevenueCat and Braze Integration allowed us to implement fast winback and upgrade messaging that ultimately resulted in a Membership churn reduction of almost 5%",
    person: "Shaheen Essabhoy",
    role: "Business Intelligence",
    stat1: "5%",
    stat1Text: "reduction in churn",
    stat2: "",
    stat2Text: "",
    logo: "https://revenuecat.wpenginepowered.com/wp-content/uploads/2024/04/vsco.svg",
    profile: "https://www.revenuecat.com/static/6d482adbd7e5205d6167584b0f0c3571/1e43f/shaheen-essabhoy.webp",
  },
];

export default function ResultsSlider() {
  const [active, setActive] = useState(() =>
    Math.floor(Math.random() * cards.length)
  );
  const indicatorWidth = 100 / cards.length;

  const prev = (active - 1 + cards.length) % cards.length;
  const next = (active + 1) % cards.length;

  const getCardPositionClass = (index) => {
    if (index === active) return "rs-main-card";
    if (index === prev) return "rs-left-card";
    if (index === next) return "rs-right-card";

    const distRight = (index - active + cards.length) % cards.length;
    const distLeft = (active - index + cards.length) % cards.length;
    return distRight < distLeft ? "rs-hidden-right" : "rs-hidden-left";
  };

  const handleCardClick = (index) => {
    if (index === prev || index === next) {
      setActive(index);
    }
  };

  const renderCard = (card, index) => (
    <div
      className={`rs-card ${getCardPositionClass(index)}`}
      onClick={() => handleCardClick(index)}
    >
      <div className="rs-card-left">
        <div className="rs-top-info">
          <img src={card.logo} alt="" className="rs-logo-img" />
          <div className="rs-company-info">
            <h2>{card.company}</h2>
            <p>{card.subtitle}</p>
          </div>
        </div>

        <p className="rs-quote">“{card.quote}”</p>

        <div className="rs-person-info">
          <img src={card.profile} alt="" className="rs-profile-img" />
          <div>
            <h4>{card.person}</h4>
            <p>{card.role}</p>
          </div>
        </div>
      </div>

      <div className="rs-card-right">
        <div>
          <h2>{card.stat1}</h2>
          <p>{card.stat1Text}</p>
        </div>

        {card.stat2 && (
          <div>
            <h2 className="rs-blue-stat">{card.stat2}</h2>
            <p>{card.stat2Text}</p>
          </div>
        )}

        <a href="/">Read case study &gt;</a>
      </div>
    </div>
  );

  return (
    <section className="rs-results-section">
      <h1>
        Driving results for the world’s
        <br />
        most downloaded apps
      </h1>

      <div className="rs-slider-stack">
        {cards.map((card, index) => (
          <React.Fragment key={card.company}>{renderCard(card, index)}</React.Fragment>
        ))}
      </div>

      <div className="rs-slider-line">
        <div
          className="rs-slider-indicator"
          style={{ left: `${active * indicatorWidth}%`, width: `${indicatorWidth}%` }}
        />
      </div>

      <div className="rs-slider-nav" aria-label="Result slider navigation">
        {cards.map((card, index) => (
          <button
            key={card.company}
            type="button"
            className={`rs-slider-name${index === active ? " rs-active" : ""}`}
            onClick={() => setActive(index)}
            aria-current={index === active ? "true" : undefined}
          >
            <img src={card.logo} alt="" className="rs-slider-brand-logo" />
            <span className="rs-slider-brand-name">{card.company}</span>
          </button>
        ))}
      </div>
    </section>
  );
}