import React, { useContext, useEffect, useState } from "react";
import { SnackBarContext } from "../../context/snackBarContext";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { Link, Outlet, useLocation } from "react-router-dom";
import SnackBar from "../ui/SnackBar";
import ProductList from "../ProductPage/ProductList";
import ProductItem from "../ProductPage/ProductItem";
import { AiOutlineProduct } from "react-icons/ai";
import Button from "../ui/Button";

const USER_PRODUCTS_URL = "http://localhost:3000/api/user/products";

function UserProducts() {
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, logoutUser } = useContext(UserContext);

  const { snackBar, displaySnackBar } = useContext(SnackBarContext);
  const token = localStorage.getItem("userToken");
  const location = useLocation();

  useEffect(() => {
    const abortController = new AbortController();
    async function getProducts() {
      try {
        setLoading(true);
        const { data } = await axios.get(USER_PRODUCTS_URL, {
          signal: abortController.signal,
          headers: {
            Authorization: token,
          },
        });
        setUserProducts(data);
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
  }, [location.pathname]);
  return (
    <>
      <div className="mt-32 px-6 break-600px:px-12 space-y-6">
        <Link to={"create"} className=" w-fit">
          Create
        </Link>
        <h1 className=" text-center font-semibold text-3xl">
          Hi {user?.username},{" "}
          <span>
            {userProducts.length > 0
              ? "your current products :"
              : "You still dont have any products"}
          </span>
        </h1>
        <ProductList>
          {userProducts.map((product) => {
            return (
              <ProductItem key={product._id} product={product}>
                <Link to={product._id}>
                  <Button inverse>
                    <AiOutlineProduct />
                  </Button>
                </Link>
              </ProductItem>
            );
          })}
        </ProductList>
      </div>
      {snackBar.display && <SnackBar />}

      <Outlet />
    </>
  );
}

export default UserProducts;
