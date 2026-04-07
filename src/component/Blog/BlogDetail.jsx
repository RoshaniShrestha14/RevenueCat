import { useParams } from "react-router-dom";
import "./BlogDetail.css";

/* Header & Footer */
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const blogs = [
  {
    id: "kotlin-coroutine-bridge",
    title:
      "Kotlin Coroutine bridges: converting any callback-based Android API to suspend functions",
    category: "ENGINEERING",
    image: "/src/images/Kotlin-Coroutines-bridges.webp",

    toc: [
      {
        id: "problem",
        label: "The fundamental problem: Callbacks do not compose",
      },
      { id: "bridge", label: "The core bridge: suspendCoroutine" },
      { id: "factory", label: "The callback factory" },
      { id: "mistakes", label: "Common mistakes to avoid" },
      { id: "conclusion", label: "Conclusion" },
    ],

    content: `
      <h2 id="problem">The fundamental problem</h2>
      <p>Callbacks do not compose well and create messy code.</p>

      <h2 id="bridge">The core bridge: suspendCoroutine</h2>
      <p>This allows converting callbacks into suspend functions.</p>

      <h2 id="factory">The callback factory</h2>
      <p>We can reduce boilerplate using reusable callback factories.</p>

      <h2 id="mistakes">Common mistakes to avoid</h2>
      <ul>
        <li>Resuming twice</li>
        <li>Not resuming at all</li>
      </ul>

      <h2 id="conclusion">Conclusion</h2>
      <p>This pattern makes async code cleaner and modern.</p>
    `,
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <h2>Blog not found</h2>;

  return (
    <>
      <Header />

      <section className="blog-detail">
        <div className="blog-container">
          {/* LEFT: TOC */}
          <aside className="toc-sidebar">
            <h3>Table of contents</h3>
            <ul>
              {blog.toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* CENTER: CONTENT */}
          <div className="content">
            <p className="category">{blog.category}</p>
            <h1>{blog.title}</h1>

            <img src={blog.image} alt="" className="cover" />

            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="right-sidebar">
            <h2 className="sidebar-title">You might also like</h2>

            <ul className="related-list">
              <li>
                <span className="label">Blog post</span>
                <a href="#" className="related-title">
                  Understanding Flow, StateFlow, and SharedFlow
                </a>
                <p className="related-desc">
                  Dive deep into internal mechanisms of Flow and StateFlow.
                </p>
              </li>

              <li>
                <span className="label">Blog post</span>
                <a href="#" className="related-title">
                  Handling edge cases in Google Play Billing
                </a>
                <p className="related-desc">
                  Covers pending purchases, errors, and subscription cases.
                </p>
              </li>

              <li>
                <span className="label">Blog post</span>
                <a href="#" className="related-title">
                  Android SDK lifecycle management with Hilt
                </a>
                <p className="related-desc">
                  Learn lifecycle management using dependency injection.
                </p>
              </li>
            </ul>

            <h2 className="sidebar-title">Share this post</h2>

            <div className="share-buttons">
              <button>Twitter</button>
              <button>LinkedIn</button>
              <button>WhatsApp</button>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetail;
