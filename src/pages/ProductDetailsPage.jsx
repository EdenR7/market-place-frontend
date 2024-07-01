import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import Modal from "../components/ui/Modal";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../context/userContext";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../components/ui/Button";
const USER_PRODUCTS_URL = "http://localhost:3000/api/user/products/";

const PRODUCTS_URL = "http://localhost:3000/api/product/";

function ProductDetailsPage() {
  const { user, logoutUser } = useContext(UserContext);
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const allowDelete = useRef(false);
  const token = localStorage.getItem("userToken");

  function navToPrevPage() {
    navigate(-1);
  }

  async function handleDeleteItem() {
    if (allowDelete.current === false) return;
    try {
      const res = await axios.delete(USER_PRODUCTS_URL + product._id, {
        headers: {
          Authorization: token,
        },
      });
      // snackBar
      navToPrevPage(-1);
    } catch (err) {
      // snackBar
      console.error(err);
    }
  }

  useEffect(() => {
    async function getProduct(url) {
      try {
        const { data, status } = await axios.get(url);
        if (status === 200) {
          if (user) allowDelete.current = data.user === user._id;
          setProduct(data);
        } else {
          throw new Error(status);
        }
      } catch (err) {
        err.response && navigate("/NotFound");
        throw err;
      }
    }
    getProduct(PRODUCTS_URL + productId);
  }, []);
  return (
    <>
      <Modal
        btn={{
          btnClassName: " right-2 text-xl hover:text-red-400",
          strip: true,
          context: <IoMdClose />,
          onClick: () => {
            navToPrevPage();
          },
        }}
        className=" w-1/2 max-w-lg"
      >
        <div className=" min-h-full w-full flex flex-col gap-2 justify-center flex-wrap overflow-hidden px-4 mt-12">
          <img
            src="https://dummyimage.com/400x200"
            alt="Placeholder Image"
            className=" rounded-md mx-auto"
          />
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <div className="  flex flex-col flex-wrap">
            <h4 className=" font-semibold">Categories:</h4>
            <ul className=" flex gap-2">
              {product.categories?.map((category) => {
                return <li key={category}>{category}</li>;
              })}
            </ul>
          </div>
          <div className=" flex justify-end relative">
            {allowDelete.current === true && (
              <Button
                onClick={handleDeleteItem}
                className="absolute left-0 hover:animate-pulse text-red-500"
              >
                Delete Product
              </Button>
            )}
            <h4 className=" underline decoration-primary-500 font-semibold">
              Total: <span>{`${product.price}$`}</span>
            </h4>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProductDetailsPage;
