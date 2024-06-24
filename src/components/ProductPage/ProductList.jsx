import React from "react";
import ProductItem from "./ProductItem";
import Button from "../ui/Button";

function ProductList(props) {
  const { children, searchParams, setSearchParams } = props;
  return (
    <ul className=" justify-items-center grid grid-cols-1 2col:grid-cols-2 3col:grid-cols-3 gap-4 max-w-full">
      {children}
    </ul>
  );
}

export default ProductList;
