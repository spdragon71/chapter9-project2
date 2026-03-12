import { Routes, Route } from "react-router";

import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";

import Layout from "./components/Layout";

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
