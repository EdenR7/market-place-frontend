import React, { useState } from "react";
import Button from "../ui/Button";
import axios from "axios";
const PRODUCTS_URL = "http://localhost:3000/api/product/";

function CreateProduct({ globalSetState }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: 0,
  });
  async function addProduct(product) {
    // Problem with render the list
    try {
      const { data: newP } = await axios.post(PRODUCTS_URL, product);
      setNewProduct({
        name: "",
        category: "",
        quantity: "",
        price: 0,
      });
      globalSetState((prev) => {
        return [...prev, newP];
      });
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <form
      className=" flex flex-col gap-2 max-w-400"
      onSubmit={(ev) => {
        ev.preventDefault();
        addProduct({
          ...newProduct,
          category:
            newProduct.category[0].toUpperCase() + newProduct.category.slice(1),
        });
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
              quantity: ev.target.value,
            };
          });
        }}
        value={newProduct.quantity}
        type="text"
        placeholder="Quantity"
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
