import "./BlogControls.css";

const BlogControls = () => {
  return (
    <div className="blog-controls">
      <div className="container">
        <div className="top-row">
          {/* CATEGORY TABS */}
          <ul className="categories">
            <li>
              <a className="active" href="#">
                All articles
              </a>
            </li>
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Engineering</a>
            </li>
            <li>
              <a href="#">Growth</a>
            </li>
          </ul>

          {/* RIGHT SIDE */}
          <div className="right-actions">
            <div className="follow">
              <span>Follow for updates:</span>

              <div className="icons">
                <a href="#">
                  <svg viewBox="0 0 24 24" className="icon">
                    <path
                      fill="currentColor"
                      d="M13.456 10.622L20.013 3H18.46l-5.693 6.618L8.22 3H2.974l6.877 10.007L2.974 21h1.554l6.012-6.989L15.343 21h5.244z"
                    />
                  </svg>
                </a>

                {/* ✅ RSS / WiFi icon */}
                <a href="/blog/rss.xml" className="group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    className="icon small text-gray-500 group-hover:text-black transition"
                  >
                    <path
                      fill="currentColor"
                      d="M2.286 16a2.286 2.286 0 1 0 0-4.571 2.286 2.286 0 0 0 0 4.57M15.999 15.999H12.95C12.952 8.857 7.142 3.047 0 3.047V0c8.822 0 15.999 7.177 15.999 15.999"
                    />
                    <path
                      fill="currentColor"
                      d="M10.666 15.999H7.619C7.619 11.798 4.2 8.38 0 8.38V5.333c5.881 0 10.666 4.785 10.666 10.666"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* ✅ SEARCH BUTTON (UPDATED) */}
            <button className="search-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="search-icon"
              >
                <path
                  fill="currentColor"
                  d="m15.681 14.142-3.796-3.796a6.549 6.549 0 1 0-1.54 1.54l3.797 3.795a1.089 1.089 0 0 0 1.54-1.54M1.491 6.569a5.078 5.078 0 1 1 10.156 0 5.078 5.078 0 0 1-10.156 0"
                />
              </svg>
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        <div className="mobile-select">
          <select>
            <option>All articles</option>
            <option>Company</option>
            <option>Engineering</option>
            <option>Growth</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BlogControls;
