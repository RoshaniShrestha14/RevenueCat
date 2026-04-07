import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "../component/Layout/Layout";
import Home from "../page/Home";
import BlogPage from "../component/Blog/BlogPage";
import AdminPage from "../page/AdminPage";
import BlogDetail from "../component/Blog/BlogDetail";
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

  const addNewPost = (newBlog) => {
    const blogWithFullData = {
      id: Date.now(),
      title: newBlog.title?.trim() || "No title",
      desc: newBlog.desc?.trim() || "",
      category: newBlog.category?.trim().toUpperCase() || "GENERAL",
      image: newBlog.image?.trim() || "/logo.svg",
      author: {
        name: newBlog.author?.trim() || "Admin",
        img: newBlog.authorImg?.trim() || undefined,
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

          <Route
            path="admin"
            element={
              <AdminPage
                addNewPost={addNewPost}
                posts={posts}
                deletePost={deletePost}
                editPost={editPost}
              />
            }
          />
        </Route>
        <Route path="/" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
