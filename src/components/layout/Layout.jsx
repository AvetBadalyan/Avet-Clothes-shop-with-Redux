import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import CartDrawer from "@/components/cart/CartDrawer.jsx";
import QuickViewModal from "@/components/product/QuickViewModal.jsx";
import ToastStack from "@/components/common/ToastStack.jsx";
import AnnouncementBar from "./AnnouncementBar.jsx";
import "./Layout.scss";

export default function Layout() {
  return (
    <div className="layout">
      <AnnouncementBar />
      <Navbar />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />

      {/* Global overlays */}
      <CartDrawer />
      <QuickViewModal />
      <ToastStack />
    </div>
  );
}
