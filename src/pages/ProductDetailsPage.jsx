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

  useEffect(() => {
    async function getProduct(url) {
      try {
        const { data } = await axios.get(url);
        setProduct(data);
      } catch (err) {
        // err.response && err.response.status === 404 && navigate("/NotFound");
        err.response && navigate("/NotFound");
        throw err;
      }
    }
    getProduct(PRODUCTS_URL + productId);
  }, []);
  return (
    <>
      <Modal buttonContext={<Link to={"/product"}>Close</Link>}>
        <div>
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <div className="">
            <h4 className=" ">
              Total: <span>{`${product.price}$`}</span>
            </h4>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProductDetailsPage;
