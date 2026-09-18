import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout.jsx";
import ScrollToTop from "@/components/common/ScrollToTop.jsx";
import Home from "@/pages/Home.jsx";
import Shop from "@/pages/Shop.jsx";
import ProductDetail from "@/pages/ProductDetail.jsx";
import Wishlist from "@/pages/Wishlist.jsx";
import Checkout from "@/pages/Checkout.jsx";
import Auth from "@/pages/Auth.jsx";
import NotFound from "@/pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:categoryId" element={<Shop />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
