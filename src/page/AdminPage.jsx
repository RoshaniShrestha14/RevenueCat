import { useState } from "react";
import "./AdminPage.css";

const AdminPage = ({ addNewPost }) => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    desc: "",
    image: "",
    author: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      image: form.image || "/src/images/free.webp",
      category: form.category,
      title: form.title,
      desc: form.desc,
      author: {
        name: form.author,
        img: "/src/images/Jaewoong-Eum.3.webp",
      },
      date: new Date().toDateString(),
    };

    addNewPost(newBlog);

    // ✅ success message
    setMessage("✅ Blog Added Successfully!");

    // clear form
    setForm({
      title: "",
      category: "",
      desc: "",
      image: "",
      author: "",
    });

    // remove message after 3 sec
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>🚀 RevenueCat Admin Panel</h2>
        <p className="subtitle">Create and publish new blog posts</p>

        {message && <div className="success-msg">{message}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <input
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category (e.g. Growth, Engineering)"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />

          <input
            name="author"
            placeholder="Author Name"
            value={form.author}
            onChange={handleChange}
            required
          />

          <textarea
            name="desc"
            placeholder="Blog Description"
            value={form.desc}
            onChange={handleChange}
            required
          />

          <button type="submit">➕ Publish Blog</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
