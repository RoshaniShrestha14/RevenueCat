import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import Home from "../page/Home";
import Blog from "../page/Blog";
import NotFound from "../component/ui/NotFound";
import { ScrollToTop } from "./ScrollToTop";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}