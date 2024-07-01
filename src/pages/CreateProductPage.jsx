import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../components/ui/Button";
import axios from "axios";
import Modal from "../components/ui/Modal";
import { Link, useNavigate } from "react-router-dom";
import SnackBar from "../components/ui/SnackBar";
import { CATEGORIES_LIST } from "../utils/url_constants";
import { SnackBarContext } from "../context/snackBarContext";
const USER_PRODUCTS_URL = "http://localhost:3000/api/user/products";

function CreateProductPage() {
  const navigate = useNavigate();
  const { snackBar, displaySnackBar } = useContext(SnackBarContext);
  const token = localStorage.getItem("userToken");
  const [newProduct, setNewProduct] = useState({
    name: "",
    categories: [],
    quantity: "",
    price: "",
  });
  function navToPrevPage() {
    navigate(-1);
  }
  function handleListBoxFilter(ev) {
    const inputName = ev.target.name;
    const checked = ev.target.checked;
    const updateCategories = checked
      ? [...newProduct.categories, inputName]
      : newProduct.categories.filter((category) => category !== inputName);
    setNewProduct((prev) => {
      return {
        ...prev,
        categories: updateCategories,
      };
    });
  }
  async function addProduct(product) {
    try {
      const { data: newP } = await axios.post(USER_PRODUCTS_URL, product, {
        headers: {
          Authorization: token,
        },
      });
      setNewProduct({
        name: "",
        categories: [],
        quantity: "",
        price: "",
      });
      navToPrevPage();
      displaySnackBar({
        label: `Product created successfully`,
      });
    } catch (err) {
      displaySnackBar({
        label: ` ${
          err.response.status === 400
            ? "Please make sure you filled correctly all the fields"
            : "Error in create operation"
        }`,
        closeManually: true,
        type: "danger",
      });
    }
  }
  return (
    <>
      <Modal
        btn={{
          onClick: navToPrevPage,
          context: <IoMdClose />,
          btnClassName: " border-0 hover:bg-inherit hover:text-red-500 right-0",
        }}
        className="p-8"
      >
        <div className=" p-4">
          <h3 className="font-semibold text-lg pb-4 ">Add New Product</h3>
          <form
            className=" flex flex-col gap-2 max-w-400"
            onSubmit={(ev) => {
              ev.preventDefault();
              addProduct(newProduct);
            }}
          >
            <input
              required
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
            <h3 className=" font-semibold">Categories : </h3>
            <ul className=" grid grid-cols-2 gap-x-8 gap-y-2 px-2">
              {CATEGORIES_LIST.map((category) => {
                return (
                  <li key={category} className=" flex gap-2 items-center">
                    <input
                      checked={newProduct.categories.includes(category)}
                      type="checkbox"
                      id={`${category}CreateOption`}
                      name={category}
                      value={category}
                      onChange={handleListBoxFilter}
                      className=" cursor-pointer"
                    />
                    <label
                      htmlFor={`${category}CreateOption`}
                      className=" cursor-pointer"
                    >
                      {category}
                    </label>
                  </li>
                );
              })}
            </ul>
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
              type="number"
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
        </div>
      </Modal>
      {snackBar.display && <SnackBar />}
    </>
  );
}

export default CreateProductPage;
