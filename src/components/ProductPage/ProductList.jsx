import React from "react";
import ProductItem from "./ProductItem";

function ProductList(props) {
  const { products, setProducts } = props;
  return (
    <ul className=" justify-items-center grid grid-cols-1 2col:grid-cols-2 3col:grid-cols-3 gap-4 max-w-full">
      {products.map((product) => {
        return (
          <ProductItem
            key={product._id}
            product={product}
            setProducts={setProducts}
          />
        );
      })}
    </ul>
  );
}

export default ProductList;
