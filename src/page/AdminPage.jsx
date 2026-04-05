import { useState } from "react";
import "./AdminPage.css";

const AdminPage = ({ addNewPost, posts = [], deletePost, editPost }) => {
  const [form, setForm] = useState({
    id: null,
    title: "",
    category: "",
    desc: "",
    image: "",
    author: "",
    authorImg: "",
  });

  const [message, setMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const recentPosts = posts;
  const previewImage = form.image.trim() || "/logo.svg";
  const isEditing = form.id !== null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      editPost({
        ...form,
        author: {
          name: form.author,
          img: form.authorImg || undefined,
        },
      });
      setMessage("Blog post updated!");
    } else {
      addNewPost(form);
      setMessage("Blog post published and saved locally.");
    }

    setForm({
      id: null,
      title: "",
      category: "",
      desc: "",
      image: "",
      author: "",
      authorImg: "",
    });

    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (post) => {
    setForm({
      id: post.id,
      title: post.title,
      category: post.category,
      desc: post.desc,
      image: post.image,
      author: post.author?.name || "",
      authorImg: post.author?.img || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    deletePost(id);
    setDeleteConfirm(null);
    setMessage("Post deleted.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleReset = () => {
    setForm({
      id: null,
      title: "",
      category: "",
      desc: "",
      image: "",
      author: "",
      authorImg: "",
    });
  };

  return (
    <section className="admin-page">
      <div className="admin-shell">
        <aside className="admin-intro">
          <p className="eyebrow">Blog admin</p>
          <h1>Publish clean posts without leaving the browser.</h1>
          <p className="intro-copy">
            Posts are stored in localStorage, so this panel behaves like a lightweight CMS on this device.
          </p>

          <div className="admin-stats">
            <div className="stat-card">
              <strong>{posts.length}</strong>
              <span>Saved posts</span>
            </div>
            <div className="stat-card">
              <strong>Local</strong>
              <span>Browser storage</span>
            </div>
          </div>

          <div className="admin-preview">
            <img src={previewImage} alt="Preview" className="preview-image" />
            <div className="preview-content">
              <p className="preview-category">{form.category || "CATEGORY"}</p>
              <h3>{form.title || "Your blog title appears here"}</h3>
              <p>{form.desc || "Write a short description to preview the card."}</p>
              <div className="preview-meta">
                <span>{form.author || "Admin"}</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="recent-posts">
            <h2>All saved posts</h2>
            {recentPosts.length === 0 ? (
              <p className="empty-state">No saved posts yet.</p>
            ) : (
              <div className="recent-list">
                {recentPosts.map((post) => (
                  <article key={post.id} className="recent-item">
                    <p>{post.category}</p>
                    <h3>{post.title}</h3>
                    <p className="recent-snippet">{post.desc}</p>
                    <span>{post.date}</span>
                    <div className="item-actions">
                      <button
                        className="item-edit-btn"
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="item-delete-btn"
                        onClick={() => setDeleteConfirm(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {deleteConfirm && (
            <div className="confirm-overlay" onClick={() => setDeleteConfirm(null)}>
              <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
                <h3>Delete this post?</h3>
                <p>This action cannot be undone.</p>
                <div className="confirm-actions">
                  <button onClick={() => setDeleteConfirm(null)}>Cancel</button>
                  <button onClick={() => handleDelete(deleteConfirm)}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </aside>

        <div className="admin-card">
          <div className="card-header">
            <p className="eyebrow dark">{isEditing ? "Edit post" : "Create post"}</p>
            <h2>{isEditing ? "Update blog entry" : "New blog entry"}</h2>
            <p>{isEditing ? "Update the post details below." : "Fill in the fields below and publish the post to the shared blog feed."}</p>
          </div>

          {message && (
            <div className="success-msg" role="status" aria-live="polite">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <label className="field">
              <span>Title</span>
              <input
                name="title"
                placeholder="Write a strong headline"
                value={form.title}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Category</span>
              <input
                name="category"
                placeholder="Company, Engineering, Growth"
                value={form.category}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Image URL</span>
              <input
                name="image"
                type="url"
                placeholder="https://... or /images/..."
                value={form.image}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span>Author</span>
              <input
                name="author"
                placeholder="Author name"
                value={form.author}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Author Avatar URL (optional)</span>
              <input
                name="authorImg"
                type="url"
                placeholder="https://... or /images/..."
                value={form.authorImg}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span>Description</span>
              <textarea
                name="desc"
                placeholder="Write a short summary for the card"
                value={form.desc}
                onChange={handleChange}
                required
              />
            </label>

            <div className="form-actions">
              <button type="submit">{isEditing ? "Update Post" : "Publish Blog"}</button>
              <button type="button" className="secondary-btn" onClick={handleReset}>
                {isEditing ? "Cancel" : "Reset"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
