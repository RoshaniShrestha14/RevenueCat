import React, { useEffect, useRef, useState } from "react";
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
  const [visibleCount, setVisibleCount] = useState(3);
  const [stepSize, setStepSize] = useState(0);
  const viewportRef = useRef(null);
  const totalSlides = Math.max(1, cardsData.length - visibleCount + 1);
  const maxSlideIndex = totalSlides - 1;
  const safeActive = Math.min(active, maxSlideIndex);
  const indicatorWidth = 100 / totalSlides;

  useEffect(() => {
    const updateMetrics = () => {
      if (!viewportRef.current) return;
      const width = viewportRef.current.clientWidth;
      const nextVisibleCount = window.innerWidth <= 1024 ? 1 : 3;
      setVisibleCount(nextVisibleCount);
      setStepSize(width / nextVisibleCount + (30 / nextVisibleCount));
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  useEffect(() => {
    if (!viewportRef.current || !stepSize) return;

    const node = viewportRef.current;
    const onScroll = () => {
      const next = Math.round(node.scrollLeft / stepSize);
      setActive(Math.max(0, Math.min(next, maxSlideIndex)));
    };

    node.addEventListener("scroll", onScroll, { passive: true });
    return () => node.removeEventListener("scroll", onScroll);
  }, [stepSize, maxSlideIndex]);

  const scrollToSlide = (index) => {
    if (!viewportRef.current) return;
    const nextIndex = Math.max(0, Math.min(index, maxSlideIndex));
    viewportRef.current.scrollTo({
      left: nextIndex * stepSize,
      behavior: "smooth",
    });
    setActive(nextIndex);
  };

  const handleCardClick = (index) => {
    scrollToSlide(index);
  };

  const handleSliderLineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const nextIndex = Math.floor(ratio * totalSlides);
    scrollToSlide(nextIndex);
  };

  return (
    <section className="tt-team-tools">
      <h2 className="tt-heading">Data and tools for every team</h2>
      <p className="tt-subheading">
        Make reliable cross-platform data and easy-to-use growth tools
        accessible to everyone.
      </p>

      <div className="tt-cards-viewport" ref={viewportRef}>
        <div className="tt-cards-track">
          {cardsData.map((card, i) => (
            <div
              className="tt-card"
              key={`${card.title}-${i}`}
              onClick={() => handleCardClick(i)}
            >
              <div
                className="tt-icon-wrap"
                style={{ background: card.color || "#eef2ff" }}
              >
                <img src={card.img} alt={card.title} />
              </div>

              <h3 className="tt-card-title">{card.title}</h3>
              <p className="tt-card-text">{card.text}</p>

              <span className="tt-link">
                For {card.title.toLowerCase()} teams &gt;
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="tt-slider-line" onClick={handleSliderLineClick}>
        <div
          className="tt-slider-indicator"
          style={{ left: `${safeActive * indicatorWidth}%`, width: `${indicatorWidth}%` }}
        />
      </div>

      <div className="tt-slider-nav" aria-label="Team tools navigation">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`tt-slider-step${safeActive === i ? " tt-active" : ""}`}
            onClick={() => scrollToSlide(i)}
            aria-current={safeActive === i ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamTools;