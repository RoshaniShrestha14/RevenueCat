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

    addNewPost(form);

    setMessage("✅ Blog Added!");

    setForm({
      title: "",
      category: "",
      desc: "",
      image: "",
      author: "",
    });

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>Admin Panel</h2>

        {message && <div className="success-msg">{message}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <input
            name="image"
            placeholder="Image URL (/images/...)"
            value={form.image}
            onChange={handleChange}
          />
          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            required
          />
          <textarea
            name="desc"
            placeholder="Description"
            value={form.desc}
            onChange={handleChange}
            required
          />

          <button type="submit">Publish Blog</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
