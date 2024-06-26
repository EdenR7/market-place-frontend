import React from "react";
import { Route, Routes } from "react-router";
import ProductsPage from "./pages/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import HomePage from "./pages/HomePage";
import { Link } from "react-router-dom";
import NavbBar from "./components/general/NavbBar";
import CreateProduct from "./pages/CreateProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import UserPage from "./pages/UserPage";

function App() {
  // Create 2 forms, Create the user Page that contain the sign in and register
  // define input component
  // Add a submit button option
  // add placeholder imgs
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
          <Route path="create" element={<ProductsPage />}>
            <Route index element={<CreateProductPage />} />
          </Route>
        </Route>
        <Route path="/user" element={<UserPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
