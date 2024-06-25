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

export function FilterProducts(props) {
  const {
    setSearchParams,
    minPriceSearch,
    maxPriceSearch,
    nameSearch,
    inStock,
  } = props;

  function handledFilter(ev) {
    const inputName = ev.target.name;
    if (ev.target.type === "checkbox") {
      const checked = ev.target.checked;
      setSearchParams((prev) => {
        prev.set("skip", 0);
        prev.set(inputName, checked);
        return prev;
      });
    } else {
      const value = ev.target.value;
      setSearchParams((prev) => {
        prev.set("skip", 0);
        prev.set(inputName, value);
        return prev;
      });
    }
  }
  function resetFilters() {
    setSearchParams((prev) => {
      prev.set("name", "");
      prev.set("minPrice", "");
      prev.set("maxPrice", "");
      prev.set("inStock", "false");
      return prev;
    });
  }
  return (
    <>
      <div className=" flex flex-col gap-2 items-center">
        <div className=" flex gap-2">
          <input
            type="text"
            value={nameSearch}
            onChange={handledFilter}
            id="filter-name"
            name="name"
            placeholder="Search ..."
            className="border px-2 py-1 rounded-sm"
          />
        </div>
        <div className=" flex gap-3 items-center">
          <div className=" flex gap-2">
            <label htmlFor="filter-minPrice">Min Price :</label>
            <input
              value={minPriceSearch}
              onChange={handledFilter}
              type="number"
              id="filter-minPrice"
              name="minPrice"
              placeholder=""
              className="border px-2 py-1 rounded-sm max-w-20"
            />
          </div>
          <div className=" flex gap-2">
            <label htmlFor="filter-maxPrice">Max Price :</label>
            <input
              value={maxPriceSearch}
              onChange={handledFilter}
              type="number"
              id="filter-maxPrice"
              name="maxPrice"
              placeholder=""
              className="border px-2 py-1 rounded-sm max-w-20"
            />
          </div>
          <div className=" flex gap-2">
            <label htmlFor="filter-inStock">Only in Stock:</label>
            <input
              checked={inStock === "true"}
              onChange={handledFilter}
              type="checkbox"
              id="filter-inStock"
              name="inStock"
              className="border px-2 py-1 rounded-sm max-w-20 cursor-pointer"
            />
          </div>
        </div>
        <Button onClick={resetFilters}>RESET FILTERS</Button>
      </div>
    </>
  );
}

function ProductsPage() {
  // add, edit, delete
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    name: "",
    minPrice: "",
    maxPrice: "",
    inStock: false,
    skip: 0,
  });

  const nameSearch = searchParams.get("name");
  const minPriceSearch = searchParams.get("minPrice");
  const maxPriceSearch = searchParams.get("maxPrice");
  const inStock = searchParams.get("inStock");
  const curPage = Number(searchParams.get("skip"));
  const location = useLocation();

  const totalProducts = useRef(0);

  const numOfPages = totalProducts.current
    ? Math.ceil(totalProducts.current / 6)
    : 0;

  const debouncedSearchParams = useDebounce(searchParams, 400); // Im passing the object that I want to delay by debounce, then I will track the changes of the debounceParams in the useEffect

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
        // console.log(data);
        totalProducts.current = total.data.count;
        setProducts(data);
      } catch (err) {
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
      <SnackBar
        label="Error"
        context="Error in operation freferfer frer"
        danger
        closeManually={true}
      ></SnackBar>
      <div className="px-12 py-12 flex flex-col gap-8 font-montserrat mt-12">
        <h2 className=" font-bold text-2xl">Our Products :</h2>
        <Link to={"create"}>Create</Link>
        <FilterProducts
          setSearchParams={setSearchParams}
          nameSearch={nameSearch}
          minPriceSearch={minPriceSearch}
          maxPriceSearch={maxPriceSearch}
          inStock={inStock}
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
      {/* <CreateProduct globalSetState={setProducts} /> */}
      <Outlet />
    </>
  );
}

export default ProductsPage;
