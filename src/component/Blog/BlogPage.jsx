import "./BlogPage.css";

const BlogCard = ({ image, category, title, desc, author, date }) => {
  return (
    <article className="blog-card">
      <img src={image} alt="" className="blog-image" />

      <div className="blog-content">
        <p className="category">{category}</p>

        <h3 className="title">{title}</h3>

        <p className="desc">{desc}</p>

        <div className="author">
          <img src={author.img} alt="" />
          <div>
            <p>{author.name}</p>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const BlogPage = () => {
  return (
    <section className="blog-page">
      <div className="container grid">
        {/* CARD */}
        <BlogCard
          image="/src/images/Kotlin-Coroutines-bridges.webp"
          category="ENGINEERING"
          title="Kotlin Coroutine bridges: converting any callback-based Android API to suspend functions"
          desc="This article explores the suspendCoroutine bridge pattern, showing how to convert callback APIs into clean suspend functions,..."
          author={{
            name: "Alice Muir kocourkova",
            img: "/src/images/Jaewoong-Eum.3.webp",
          }}
          date="March 31, 2026"
        />
        <BlogCard
          image="/src/images/subscription.webp"
          category="GROWTH"
          title="AI features are eroding your subscription app's margins - here's how to fix it"
          desc="On the hidden cost of AI features, and why you should treat usage like paid media spend"
          author={{
            name: "Alice Muir kocourkova",
            img: "/src/images/alice-muir-kocourkova.1.webp",
          }}
          date="March 26, 2026"
        />

        <BlogCard
          image="/src/images/Launched.webp"
          category="GROWTH"
          title="Solve time, and they'll pay you"
          desc="On the podcast: Antoine shares how he built RocketSim from an internal tool into a thriving business, the challenges of scaling as indi..."
          author={{
            name: "Charlie Chapman",
            img: "/src/images/charlie-chapman.2.webp",
          }}
          date="March 25, 2026"
        />

        <BlogCard
          image="/src/images/android.webp"
          category="ENGINEERING"
          title="The Android paywall conversion gap: why the problem isn't your trial, it's your funnel entrance"
          desc="This article breaks down the Android paywall funnel , including where users drop off and how subscription options are actually selected."
          author={{
            name: "Jaewoong Eum",
            img: "/src/images/Jaewoong-Eum.3.webp",
          }}
          date="March 25, 2026"
        />

        <BlogCard
          image="/src/images/free.webp"
          category="GROWTH"
          title="Why free trials don't make sense anymore (and what user acquistion tactic to try instead)"
          desc="Why short trials, AI costs, and web funnels are forcing UA teams to rethink free trials"
          author={{
            name: "David Vargas",
            img: "/src/images/david-vargas.4.webp",
          }}
          date="March 23, 2026"
        />

        {/*  PODCAST CARD ADDED HERE */}
        <div className="podcast-card">
          <img
            src="/src/images/posts-list-podcast-card-illustration-aafc0f5928d11920bc111537bc44d3bf.svg"
            alt=""
            className="podcast-image"
          />

          <div className="podcast-content">
            <h2 className="podcast-title">The Sub Club Podcast</h2>

            <p className="podcast-desc">
              Interviews and deep dives with the experts behind the biggest apps
              in the world.
            </p>

            <a href="#" className="podcast-btn">
              <div className="play-icon">▶</div>
              <span>Listen now</span>
            </a>
          </div>
        </div>
        {/* 🔥 BIG HORIZONTAL CARD */}
        <div className="horizontal-card">
          <img
            src="/src/images/theright.webp"
            alt=""
            className="horizontal-image"
          />

          <div className="horizontal-content">
            <p className="category">GROWTH</p>

            <h3 className="horizontal-title">
              The 7-day trial, and other free trial myths: how to choose the
              right trial length for your subscription app
            </h3>

            <p className="horizontal-desc">
              How to design trials that build habits, reduce churn, and drive
              revenue
            </p>

            <div className="author">
              <img src="/src/images/daphne-tideman.5.webp" alt="" />
              <div>
                <p>Daphne Tideman</p>
                <span>March 19, 2026</span>
              </div>
            </div>
          </div>
        </div>
        <BlogCard
          image="/src/images/startapp-school.webp"
          category="COMPANY"
          title="Announcing StartApp School: Free courses from the experts who've scaled what you're building"
          desc="Turn your app idea into a durable, profitable business with free courses from industry experts."
          author={{
            name: "Peter Meinertzhagen",
            img: "/src/images/peter-meinertzhagen.webp",
          }}
          date="March 19, 2026"
        />
        <BlogCard
          image="/src/images/Coconote-1.webp"
          category="GROWTH"
          title="How Coconote hit $1M ARR in 4 months with no paid ads"
          desc="On the podcast: about hitting $1M ARR in four months with no paid ads, why trial extensions beat discounts for saving cancellations, and..."
          author={{
            name: "David Vargas",
            img: "/src/images/David-Barnard.webp",
          }}
          date="March 18, 2026"
        />
        <BlogCard
          image="/src/images/Remote-testing.webp"
          category="ENGINEERING"
          title="Apple guidelines explained: remote testing your iOS app (without getting your account banned)"
          desc="Where Apple draws the line on remote config: safe experiments vs. violations"
          author={{
            name: "Rik Haandrikman",
            img: "/src/images/Rik Haandrikman.webp",
          }}
          date="March 18, 2026"
        />
        {/* SUBSCRIBE SECTION */}
        <div className="subscribe-box">
          <h2>Subscribe to our newsletter</h2>

          <form className="subscribe-form">
            <input type="email" placeholder="Your email address..." />
            <button>Subscribe</button>
          </form>

          {/* background shapes */}
          <div className="shape-left"></div>
          <div className="shape-right"></div>
        </div>

        <BlogCard
          image="/src/images/Funnels-public-beta.webp"
          category="COMPANY"
          title="Build web-to-app funnels to convert more traffic"
          desc="RevenueCat Funnels is in public beta."
          author={{
            name: "Niklas Winkels",
            img: "/src/images/Niklas Winkels.webp",
          }}
          date="March 17, 2026"
        />
        <BlogCard
          image="/src/images/Firebender-now.webp"
          category="COMPANY"
          title="Firebender now supports REVENUECAT MCP and OAuth"
          desc="In this article, you'll explore how Firebender integrates with RevenueCat's MCP server, including how OAuth sign-in extablishes the..."
          author={{
            name: "Jaewoong Eum",
            img: "/src/images/Jaewoong-Eum.3.webp",
          }}
          date="March 17, 2026"
        />
        <BlogCard
          image="/src/images/Enhanced-app-campaigns.webp"
          category="GROWTH"
          title="Beyond SKAN: why standard app campaigns no longer define mobile UA"
          desc="How enhanced app campaigns reshape attribution, reach, and control"
          author={{
            name: "Lucas Moscon",
            img: "/src/images/lucas-moscon-revenuecat-author.webp",
          }}
          date="March 16, 2026"
        />
        {/* PAGINATION */}
        <div className="pagination-wrapper">
          <ul className="pagination">
            {/* PREVIOUS */}
            <li className="prev disabled">
              <button>
                ← <span>Previous</span>
              </button>
            </li>

            {/* PAGE NUMBERS */}
            <li className="active">1</li>
            <li>2</li>
            <li className="dots">...</li>
            <li>47</li>

            {/* NEXT */}
            <li className="next">
              <button>
                <span>Next</span> →
              </button>
            </li>
          </ul>
        </div>
        <div className="spacer"></div>
        <br />
        {/* ===== CTA SECTION (FULL WIDTH FIX) ===== */}
        <div className="cta-wrapper">
          <section className="cta-section">
            <div className="cta-container">
              {/* LEFT */}
              <div className="cta-left">
                <h2>Want to see how RevenueCat can help?</h2>

                <div className="cta-buttons">
                  <a href="#" className="btn-primary">
                    Talk to sales
                  </a>
                  <a href="#" className="btn-link">
                    Try It For Free
                  </a>
                </div>
              </div>

              {/* RIGHT */}
              <div className="cta-card">
                <p className="cta-quote">
                  “RevenueCat enables us to have one single source of truth for
                  subscriptions and revenue data.”
                </p>

                <div className="cta-user">
                  <img src="/src/images/user.jpg" alt="user" />
                  <span>Olivier Lemarié, Photoroom</span>
                </div>

                <a href="#" className="cta-link">
                  Read Case Study
                </a>

                <div className="cta-shape"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
