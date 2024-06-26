import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { AiOutlineProduct } from "react-icons/ai";

function ProductItem(props) {
  const { product, setProducts, children } = props;
  return (
    <>
      <li
        key={product._id}
        className=" pb-4 rounded-lg shadow-lg max-w-md w-80 h-80 relative flex flex-col justify-between overflow-hidden"
      >
        <img src="https://dummyimage.com/400x200" alt="Placeholder Image" />
        <div className="px-6 pt-1 z-10">
          <div className="flex justify-between">
            <h3 className=" font-semibold text-lg">{product.name}</h3>
            {children}
            
          </div>
          <div className="mt-2 ">
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
        <div className=" text-right px-10">
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
