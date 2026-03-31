import "./Featured.css";

const Featured = () => {
  return (
    <section className="featured-section">
      {/* SEO hidden heading */}
      <h1 className="sr-only">Blog</h1>

      <div className="container">
        <article className="featured-grid">
          {/* IMAGE */}
          <a href="#" className="image-wrapper">
            <img
              src="/src/images/blog-cover.webp"
              alt="Subscription app trends 2026"
            />
          </a>

          {/* CONTENT */}
          <div className="content">
            <header>
              <p className="tag">Featured Post</p>

              <h2 className="title">
                <a href="#">
                  The State of Subscription Apps in 10 minutes: lessons, trends,
                  and benchmarks for 2026
                </a>
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
                  <a href="#">Lorelei Whitman</a>
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
