import { useParams } from "react-router-dom";
import "./BlogDetail.css";
import { useState } from "react";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-kotlin";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import { useEffect } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import posts from "../../data/posts";
import aiSubscriptionMarginsPost from "../../data/aiSubscriptionMargins";

const BlogDetail = () => {
  const { id } = useParams();
  const [openItem, setOpenItem] = useState(null);
  const blog = posts.find((b) => b.id === id) || aiSubscriptionMarginsPost;

  useEffect(() => {
    Prism.highlightAll();
    window.copyHeadingLink = (id) => {
      const url = window.location.origin + window.location.pathname + "#" + id;
      navigator.clipboard.writeText(url);

      alert("Link copied!");
    };
  }, [blog]);

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
              {blog.toc?.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();

                      // TOGGLE children
                      if (item.children) {
                        setOpenItem(openItem === item.id ? null : item.id);
                      }

                      const el = document.getElementById(item.id);
                      if (el) {
                        const yOffset = -120;
                        const y =
                          el.getBoundingClientRect().top +
                          window.pageYOffset +
                          yOffset;

                        window.scrollTo({ top: y, behavior: "smooth" });
                      }
                    }}
                  >
                    {item.label}
                  </a>

                  {/* SHOW CHILDREN ONLY WHEN CLICKED */}
                  {item.children && openItem === item.id && (
                    <ul className="toc-children">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a
                            href={`#${child.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(child.id);

                              if (el) {
                                const yOffset = -120;
                                const y =
                                  el.getBoundingClientRect().top +
                                  window.pageYOffset +
                                  yOffset;

                                window.scrollTo({ top: y, behavior: "smooth" });
                              }
                            }}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {/* CENTER: CONTENT */}
          <div className="content">
            <p className="category">{blog.category}</p>

            <div className="blog-header">
              <h1 className="blog-title">{blog.title}</h1>

              <div className="blog-meta">
                <span className="read-time">10 min read</span>
              </div>
            </div>

            <img src={blog.image} alt={blog.title} className="cover" />

            {/* BLOG CONTENT */}
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="right-sidebar">
            <h2 className="sidebar-title">You might also like</h2>

            <ul className="related-list">
              <li>
                <span className="label">Blog post</span>
                <a href="#" className="related-title">
                  Understanding Flow, StateFlow, and SharedFlow
                </a>
                <p className="related-desc">
                  Dive deep into internal mechanisms of Flow.
                </p>
              </li>

              <li>
                <span className="label">Blog post</span>
                <a href="#" className="related-title">
                  Handling edge cases in Google Play Billing
                </a>
                <p className="related-desc">
                  Covers billing edge cases and subscriptions.
                </p>
              </li>

              <li>
                <span className="label">Blog post</span>
                <a href="#" className="related-title">
                  Android SDK lifecycle management with Hilt
                </a>
                <p className="related-desc">
                  Learn dependency injection with lifecycle handling.
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
