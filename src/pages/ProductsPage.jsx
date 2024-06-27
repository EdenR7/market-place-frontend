import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { data } from "browserslist";
import ProductList from "../components/ProductPage/ProductList";
import { Outlet } from "react-router";
import CreateProduct from "../components/general/CreateProduct";
import ProductItem from "../components/ProductPage/ProductItem";
import SnackBar from "../components/ui/SnackBar";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import useDebounce from "../hooks/useDebounce";
import { PRODUCTS_URL } from "../utils/url_constants";
import { FilterProducts } from "../components/ProductPage/FilterProduct";

function ProductsPage() {
  // edit, delete snackbar
  // STATES
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // SEARCH PARAMS
  const [searchParams, setSearchParams] = useSearchParams({
    name: "",
    minPrice: 0,
    maxPrice: 2000,
    inStock: false,
    categories: "",
    skip: 0,
  });

  const location = useLocation();
  //REQ PARAMS DERIVED STATES
  const nameSearch = searchParams.get("name");
  const minPriceSearch = searchParams.get("minPrice");
  const maxPriceSearch = searchParams.get("maxPrice");
  const categoriesSearch = searchParams.get("categories");
  const categoriesSearchArr = categoriesSearch // important!
    ? categoriesSearch.split(",")
    : [];
  const inStock = searchParams.get("inStock");
  const curPage = Number(searchParams.get("skip"));

  // PAGINATION RELATIVE VARIABLES
  const totalProducts = useRef(0);
  const numOfPages = totalProducts.current
    ? Math.ceil(totalProducts.current / 6)
    : 0;

  // DEBOUNCE HANDLER, THEN WE TRACK IT
  const debouncedSearchParams = useDebounce(searchParams, 400); // Im passing the object that I want to delay by debounce, then I will track the changes of the debounceParams in the useEffect

  //  FETCH REQUESTS
  useEffect(() => {
    const abortController = new AbortController();
    async function getProducts() {
      try {
        setLoading(true);
        if (curPage < 0) {
          setSearchParams((prev) => {
            prev.set("skip", 0);
            return prev;
          });
          return;
        }
        const { data } = await axios.get(PRODUCTS_URL + location.search, {
          signal: abortController.signal,
        });
        const total = await axios.get(
          PRODUCTS_URL + "count" + location.search,
          {
            signal: abortController.signal,
          }
        );
        totalProducts.current = total.data.count;
        setProducts(data);
      } catch (err) {
        if (err.name === "CanceledError") {
          console.log("Aborted");
          return;
        }
        throw err;
      } finally {
        setLoading(false);
      }
    }
    getProducts();
    return () => {
      abortController.abort();
    };
  }, [debouncedSearchParams]);

  //Pagination
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
      <div className="px-6 py-24 flex flex-col gap-8 font-montserrat mt-12 break-400px:px-12">
        <h2 className=" font-bold text-2xl">Our Products :</h2>
        <Link to={"create"}>Create</Link>
        <FilterProducts
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          nameSearch={nameSearch}
          minPriceSearch={minPriceSearch}
          maxPriceSearch={maxPriceSearch}
          inStock={inStock}
          categoriesSearch={categoriesSearch}
          categoriesSearchArr={categoriesSearchArr}
        />
        <ProductList
          loading={loading}
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
      <Outlet />
    </>
  );
}

export default ProductsPage;
