import React, { useState } from "react";
import Button from "../ui/Button";

function CreateProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category: "",
  });
  return (
    <form
      className=" flex flex-col gap-2 max-w-400"
      onSubmit={(ev) => {
        ev.preventDefault();
        console.log(newProduct);
      }}
    >
      <input
        onChange={(ev) => {
          setNewProduct((prev) => {
            return {
              ...prev,
              name: ev.target.value,
            };
          });
        }}
        value={newProduct.name}
        type="text"
        placeholder="Product Label"
        className="border px-6 py-2 rounded-sm"
      />
      <input
        onChange={(ev) => {
          setNewProduct((prev) => {
            return {
              ...prev,
              category: ev.target.value,
            };
          });
        }}
        value={newProduct.category}
        type="text"
        placeholder="Categories"
        className="border px-6 py-2 rounded-sm"
      />
      <input
        onChange={(ev) => {
          setNewProduct((prev) => {
            return {
              ...prev,
              price: ev.target.value,
            };
          });
        }}
        value={newProduct.price}
        type="number"
        placeholder="Price"
        className="border px-6 py-2 rounded-sm "
      />
      <Button>SUBMIT</Button>
    </form>
  );
}

export default CreateProduct;
