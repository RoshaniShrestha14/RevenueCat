import "./Featured.css";
import { Link } from "react-router-dom";

const Featured = () => {
  return (
    <section className="featured-section">
      <h1 className="sr-only">Blog</h1>

      <div className="container">
        <article className="featured-grid">
          {/* IMAGE */}
          <Link
            to="/blog/state-of-subscription-apps-2026"
            className="image-wrapper"
          >
            <img
              src="/src/images/blog-cover.webp"
              alt="Subscription app trends 2026"
            />
          </Link>

          {/* CONTENT */}
          <div className="content">
            <header>
              <p className="tag">Featured Post</p>

              <h2 className="title">
                <Link to="/blog/state-of-subscription-apps-2026">
                  The State of Subscription Apps in 10 minutes: lessons, trends,
                  and benchmarks for 2026
                </Link>
              </h2>

              <p className="desc">
                Essential insights from the world’s largest subscription app
                dataset
              </p>
            </header>

            {/* AUTHOR */}
            <footer className="author">
              <img
                src="/src/images/Lorelei-Whitman.webp"
                alt="Lorelei Whitman"
              />

              <div>
                <p className="author-name">
                  <Link to="/blog/state-of-subscription-apps-2026">
                    Lorelei Whitman
                  </Link>
                </p>
                <p className="date">March 19, 2026</p>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Featured;
