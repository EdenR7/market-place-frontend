import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import Modal from "../components/ui/Modal";
const PRODUCTS_URL = "http://localhost:3000/api/product/";

function ProductDetailsPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  function navToPrevPage() {
    navigate(-1);
  }

  useEffect(() => {
    async function getProduct(url) {
      try {
        const { data, status } = await axios.get(url);
        if (status === 200) {
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
          context: "Close",
          onClick: () => {
            navToPrevPage();
          },
        }}
        className=" w-1/2 max-w-lg"
      >
        <div className=" h-full w-full flex flex-col gap-2 justify-center flex-wrap overflow-hidden px-4">
          <img src="https://dummyimage.com/400x200" alt="Placeholder Image" className=" rounded-md"/>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <div className="  flex flex-col flex-wrap">
            <h4 className=" font-semibold">Categories:</h4>
            <ul className=" flex gap-2">
              {product.categories?.map((category) => {
                return <li key={category}>{category}</li>;
              })}
            </ul>
          </div>
          <div className=" flex justify-end">
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
