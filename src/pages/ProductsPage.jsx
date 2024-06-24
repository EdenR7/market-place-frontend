import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { data } from "browserslist";
import ProductList from "../components/ProductPage/ProductList";
import { Outlet } from "react-router";
import CreateProduct from "../components/general/CreateProduct";
import ProductItem from "../components/ProductPage/ProductItem";
import SnackBar from "../components/ui/SnackBar";
import { useSearchParams, useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
const PRODUCTS_URL = "http://localhost:3000/api/product/";

function ProductsPage() {
  //Loader, Abort
  const [products, setProducts] = useState([]);
  // const [curPage, setCurPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams({
    name: "",
    minPrice: "",
    maxPrice: "",
    skip: 0,
  });
  const nameSearch = searchParams.get("name");
  const minPriceSearch = searchParams.get("minPrice");
  const maxPriceSearch = searchParams.get("maxPrice");
  const curPage = Number(searchParams.get("skip"));
  const location = useLocation();
  console.log(location.search);

  const totalProducts = useRef(0);

  const numOfPages = totalProducts.current
    ? Math.ceil(totalProducts.current / 6)
    : 0;
  // `?skip=${curPage - 1}`
  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get(PRODUCTS_URL + location.search);
        const total = await axios.get(PRODUCTS_URL + "count" + location.search);
        totalProducts.current = total.data.count;
        console.log(totalProducts);
        setProducts(data);
      } catch (err) {
        throw err;
      }
    }
    getProducts();
  }, [searchParams]);

  function handleNextPage() {
    setSearchParams((prev) => {
      prev.set("skip", curPage + 1);
      return prev;
    });
  }
  function handlePrevPage() {
    setSearchParams((prev) => {
      prev.set("skip", curPage - 1);
      return prev;
    });
  }

  return (
    <>
      <div className="px-12 py-12 flex flex-col gap-8 font-montserrat">
        <div>
          <div>
            <label htmlFor="filter-minPrice">Min Price :</label>
            <input
              value={minPriceSearch}
              onChange={(ev) => {
                setSearchParams((prev) => {
                  prev.set("minPrice", ev.target.value);
                  return prev;
                });
              }}
              type="number"
              id="filter-minPrice"
              placeholder=""
              className="border px-2 py-1 rounded-sm"
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="filter-maxPrice">Max Price :</label>
            <input
              value={maxPriceSearch}
              onChange={(ev) => {
                setSearchParams((prev) => {
                  prev.set("maxPrice", ev.target.value);
                  return prev;
                });
              }}
              type="number"
              id="filter-maxPrice"
              placeholder=""
              className="border px-2 py-1 rounded-sm"
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="filter-name">Name:</label>
            <input
              type="text"
              value={nameSearch}
              onChange={(ev) => {
                setSearchParams((prev) => {
                  prev.set("name", ev.target.value);
                  return prev;
                });
              }}
              id="filter-name"
              placeholder=""
              className="border px-2 py-1 rounded-sm"
            />
          </div>
        </div>
        <h2 className=" font-bold text-2xl">Our Products :</h2>
        <ProductList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        >
          {products.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                setProducts={setProducts}
              />
            );
          })}
        </ProductList>
      </div>
      <div className="  flex gap-10 justify-center">
        <Button onClick={handlePrevPage} disabled={curPage === 0}>
          Prev
        </Button>
        <div className=" font-semibold">
          {numOfPages ? `${curPage + 1} of ${numOfPages}` : "No results found"}
        </div>
        <Button
          onClick={handleNextPage}
          disabled={curPage + 1 === numOfPages || numOfPages === 0}
        >
          Next
        </Button>
      </div>
      <CreateProduct globalSetState={setProducts} />
      <Outlet />
    </>
  );
}

export default ProductsPage;
