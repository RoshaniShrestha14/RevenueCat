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

        {/* MORE CARDS */}
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

        <BlogCard
          image="/src/images/theright.webp"
          category="GROWTH"
          title="The 7-day trial, and other free trial myths: how to choose the right trial length for your subscription app"
          desc="How to design trials that build habits, reduce churn, and drive revenue"
          author={{
            name: "Daphne Tideman",
            img: "/src/images/daphne-tideman.5.webp",
          }}
          date="March 25, 2026"
        />
      </div>
    </section>
  );
};

export default BlogPage;
