import React from "react";
import { Route, Routes } from "react-router";
import ProductsPage from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import { Link } from "react-router-dom";
import NavbBar from "./components/general/NavbBar";

function App() {
  return (
    <>
      <NavbBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product">
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductsPage />}>
            <Route index element={<ProductDetailsPage />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
