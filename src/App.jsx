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
import Footer from "./components/general/Footer";
import UserSetupPage from "./pages/UserSetupPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserNavBar from "./components/UserProfilePage/UserNavBar";
import UserProducts from "./components/UserProfilePage/UserProducts";
// import UserSetupPage from "./pages/UserSetupPage";
// import UserProfilePage from "./pages/UserProfilePage";

function App() {
  // fix the page problem when Im on a product page (it displays the last page)
  // pagination and search by name in userProducts
  return (
    <>
      <NavbBar />
      <div className=" min-h-screen">
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
          <Route path="/user">
            <Route index element={<UserPage />} />
            <Route path="setup" element={<UserSetupPage />} />
            <Route path="profile" element={<UserNavBar />}>
              <Route index element={<UserProfilePage />} />
              <Route path="products">
                <Route index element={<UserProducts />} />
                <Route path="create" element={<UserProducts />}>
                  <Route index element={<CreateProductPage />} />
                </Route>
                <Route path=":productId" element={<UserProducts />}>
                  <Route index element={<ProductDetailsPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
