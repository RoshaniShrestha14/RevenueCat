import React from "react";
import "./Growth.css";

const growthCards = [
	{
		id: 1,
		image: "/card1.png",
		title: "Make informed decisions faster.",
		description:
			"Use predictive analytics to estimate your campaign cohorts' payback period.",
		alt: "Prediction explorer analytics card",
	},
	{
		id: 2,
		image: "/card2.png",
		title: "Get more out of your MMP investment.",
		description:
			"Analyze campaign performance beyond initial conversion.",
		alt: "Subscriptions and media source performance card",
	},
	{
		id: 3,
		image: "/card3.png",
		title: "Maximize Web-to-App Revenue.",
		description:
			"Bypass fees and attribution restrictions with campaigns that convert on the web.",
		alt: "Web to app paywall card",
	},
];

const Growth = () => {
	return (
		<section className="growth-section">
			<div className="growth-container">
				<h2>Understand what drives <br></br>growth &amp; do more of it</h2>

				<div className="growth-cards">
					{growthCards.map((card) => (
						<article className="growth-card" key={card.id}>
							<img src={card.image} alt={card.alt} />
							<div className="growth-card-content">
								<h3>{card.title}</h3>
								<p>{card.description}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default Growth;
