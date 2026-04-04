import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import Home from "../page/Home";
import Blog from "../page/Blog";
import AdminPage from "../page/AdminPage";
import { useState } from "react";

const AppRoutes = () => {
  const [posts, setPosts] = useState([]);

  const addNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* ✅ PASS POSTS */}
          <Route path="blog" element={<Blog posts={posts} />} />

          {/* ✅ PASS FUNCTION */}
          <Route path="admin" element={<AdminPage addNewPost={addNewPost} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
