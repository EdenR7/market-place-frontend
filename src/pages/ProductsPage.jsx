import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { data } from "browserslist";
import ProductList from "../components/ProductPage/ProductList";
import { Outlet } from "react-router";
const PRODUCTS_URL = "http://localhost:3000/api/product";

function ProductsPage() {
  // const {
  //   data: products,
  //   setData: setProducts,
  //   error,
  //   loading,
  // } = useFetch(PRODUCTS_URL);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get(PRODUCTS_URL);
        setProducts(data);
      } catch (err) {
        throw err;
      }
    }
    getProducts();
  }, []);

  return (
    <>
      <div className="px-12 py-12 flex flex-col gap-8 font-montserrat">
        <h2 className=" font-bold text-2xl">Our Products :</h2>
        <ProductList products={products} setProducts={setProducts} />
      </div>
      <Outlet />
    </>
  );
}

export default ProductsPage;
