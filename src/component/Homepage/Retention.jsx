import React from "react";
import "./Retention.css";

const retentionCards = [
	{
		id: 1,
		image: "/Retention1.png",
		title: "Self-serve support.",
		description:
			"Build a custom user interface in seconds to automate in-app support and show customers targeted promotional offers.",
		alt: "Self-serve support workflow card",
	},
	{
		id: 2,
		image: "/Retention2.png",
		title: "Full picture at a glance.",
		description:
			"Debug and assist customers faster with centralized cross-platform data.",
		alt: "Customer profile and history card",
	},
	{
		id: 3,
		image: "/Retention3.png",
		title: "Automate refund handling.",
		description:
			"Automatically manage Apple refund requests powered by usage data and your preferences to reduce auto-approvals and retain more revenue.",
		alt: "Automated refund handling card",
	},
	{
		id: 4,
		image: "/retention4.png",
		title: "Win back at-risk customers.",
		description:
			"Re-engage at-risk or churned customers with targeted strategies to boost retention and revenue.",
		alt: "Win back at-risk customers card",
	},
];

const Retention = () => {
	return (
		<section className="retention-section">
			<div className="retention-container">
				<h2 className="retention-title">Smarter support. Stronger retention</h2>
				<p className="retention-subtitle">
					Access ready-to-use growth tools that work together seamlessly to
					maximize your revenue.
				</p>

				<div className="retention-grid">
					{retentionCards.map((card) => (
						<article className="retention-card" key={card.id}>
							<img
								src={card.image}
								alt={card.alt}
								className="retention-card-image"
							/>
							<div className="retention-card-content">
								<h3>{card.title}</h3>
								<p>{card.description}</p>
							</div>
						</article>
					))}
				</div>

				<div className="retention-highlight">
					<div className="retention-highlight-container">
						<div className="retention-highlight-logo-wrap">
							<img
								src="https://revenuecat.wpenginepowered.com/wp-content/uploads/2025/07/dipsea.svg"
								alt="Dipsea logo"
								className="retention-highlight-logo"
							/>
						</div>

						<div className="retention-highlight-content">
							<p>
								Learn how Dipsea reduced refund rates by <span>36%</span> with
								automated refund handling.
							</p>
							<a href="#">Read case study &gt;</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Retention;
