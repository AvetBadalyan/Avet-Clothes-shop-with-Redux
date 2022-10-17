import { Routes, Route } from "react-router-dom";
import CategoryPage from "./Pages/CategoryPage/CategoryPage.jsx";
import Checkout from "./Pages/Checkout/Checkout.jsx";
import Home from "./Pages/Home/Home.jsx";
import Navigation from "./Pages/Navigation/Navigation.jsx";
import Shop from "./Pages/Shop/Shop.jsx";
import SignUp from "./Pages/SignUp/SignUp.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sing-up" element={<SignUp />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path=":categoryId" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
