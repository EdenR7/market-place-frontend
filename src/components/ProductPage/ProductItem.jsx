import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { AiOutlineProduct } from "react-icons/ai";

function ProductItem(props) {
  const { product, setProducts } = props;
  return (
    <>
      <li
        key={product._id}
        className=" bg-white p-10 rounded-lg shadow-lg max-w-md w-400 h-72 relative flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between">
            <h3 className=" font-semibold text-lg">{product.name}</h3>
            <Link to={`/product/${product._id}`}>
              <Button inverse>
                <AiOutlineProduct />
              </Button>
            </Link>
          </div>
          <div className="mt-4 ">
            <h4 className="underline">Categories:</h4>
            <ul className="flex flex-wrap">
              {product.categories.map((category, index) => {
                return (
                  <li className="mr-2" key={category}>
                    {category}
                    {index + 1 === product.categories.length ? "" : ","}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className=" text-right">
          <h4 className=" font-semibold">
            <span className="  underline decoration-primary-500">Total:</span>{" "}
            <span>{`${product.price}$`}</span>
          </h4>
        </div>
      </li>
    </>
  );
}

export default ProductItem;
