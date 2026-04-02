import React from "react";
import "./GrowthTestimonial.css";

const GrowthTestimonial = () => {
	return (
		<section className="growth-testimonial">
			<div className="growth-testimonial-container">
				<div className="growth-testimonial-logo-wrap">
					<img
						src="https://revenuecat.wpenginepowered.com/wp-content/uploads/2025/09/holywater-transparent.svg"
						alt="Holywater logo"
						className="growth-testimonial-logo"
					/>
				</div>

				<div className="growth-testimonial-content">
					<p>
						"Marketing drives 80% of our revenue. We rely on RevenueCat to
						optimize campaigns, evaluate creatives, and run our business."
					</p>
					<a href="#">Read case study &gt;</a>
				</div>
			</div>
		</section>
	);
};

export default GrowthTestimonial;
