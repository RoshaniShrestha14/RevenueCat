import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "../component/Layout/Layout";
import Home from "../page/Home";
import BlogPage from "../component/Blog/BlogPage";
import AdminPage from "../page/AdminPage";
import { ScrollToTop } from "./ScrollToTop";

const AppRoutes = () => {
  // LOAD DATA
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem("blogs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(posts));
  }, [posts]);

  // ✅ ADD BLOG WITHOUT IMAGE
  const addNewPost = (newBlog) => {
    const blogWithFullData = {
      id: Date.now(),
      title: newBlog.title || "No title",
      desc: newBlog.desc || "",
      category: newBlog.category || "GENERAL",
      author: {
        name: newBlog.author || "Admin",
      },
      date: new Date().toLocaleDateString(),
    };

    setPosts((prev) => [blogWithFullData, ...prev]);
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const editPost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home posts={posts} />} />

          <Route
            path="blog"
            element={
              <BlogPage
                posts={posts}
                deletePost={deletePost}
                editPost={editPost}
              />
            }
          />

          <Route path="admin" element={<AdminPage addNewPost={addNewPost} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
