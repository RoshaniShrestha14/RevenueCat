import { useParams } from "react-router-dom";
import "./BlogDetail.css";
import Prism from "prismjs";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-kotlin";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import { useEffect } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import posts from "../../data/posts";

const BlogDetail = () => {
  const { id } = useParams();

  const blog = posts.find((b) => b.id === id);

  useEffect(() => {
    Prism.highlightAll();
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
                      const el = document.getElementById(item.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
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

            <div className="blog-header">
              <h1 className="blog-title">{blog.title}</h1>

              <p className="blog-subtitle">
                This article explores the suspendCoroutine bridge pattern,
                showing how to convert callback APIs into clean suspend
                functions, handle diverse callback shapes, design proper error
                propagation, and how SDKs like RevenueCat apply it at scale.
              </p>

              <div className="blog-meta">
                <span className="read-time">10 min read</span>
              </div>
            </div>

            <img src={blog.image} alt={blog.title} className="cover" />

            <div className="author-meta">
              <div className="author-left">
                <img
                  src="/src/images/Jaewoong-Eum.3.webp"
                  alt="author"
                  className="author-avatar"
                />
                <div className="author-info">
                  <p className="author-name">Jaewoong Eum</p>
                </div>
              </div>

              <div className="author-right">
                <span>
                  Published <time className="publish-date">March 31, 2026</time>
                </span>
              </div>
            </div>

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
