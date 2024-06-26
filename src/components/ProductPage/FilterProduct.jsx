import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { CATEGORIES_LIST } from "../../utils/url_constants";

export function FilterProducts(props) {
  const {
    setSearchParams,
    minPriceSearch,
    maxPriceSearch,
    nameSearch,
    inStock,
    categoriesSearch,
    categoriesSearchArr,
  } = props;

  function handledFilter(ev) {
    const inputName = ev.target.name;
    if (ev.target.type === "checkbox") {
      const checked = ev.target.checked;
      setSearchParams((prev) => {
        prev.set("skip", 0);
        prev.set(inputName, checked);
        return prev;
      });
    } else {
      const value = ev.target.value;
      setSearchParams((prev) => {
        prev.set("skip", 0);
        prev.set(inputName, value);
        return prev;
      });
    }
  }
  function handleListBoxFilter(ev) {
    // get the name of the category
    const inputName = ev.target.name;
    // get if the checkBox checked
    const checked = ev.target.checked;
    // cheked : insert to the array, else : remove
    const newCategoriesArr = checked
      ? [...categoriesSearchArr, inputName]
      : categoriesSearchArr.filter((category) => category !== inputName);
    // fix the problem of insert "" to the array
    console.log(newCategoriesArr);
    setSearchParams((prev) => {
      prev.set("skip", 0);
      prev.set("categories", newCategoriesArr.join(","));
      return prev;
    });
  }
  function resetFilters() {
    setSearchParams((prev) => {
      prev.set("name", "");
      prev.set("minPrice", "");
      prev.set("maxPrice", "");
      prev.set("inStock", "false");
      prev.set("categories", "");
      return prev;
    });
  }
  return (
    <>
      <div className=" flex flex-col gap-2 items-center">
        <div className=" flex gap-2">
          <input
            type="text"
            value={nameSearch}
            onChange={handledFilter}
            id="filter-name"
            name="name"
            placeholder="Search ..."
            className="border px-2 py-1 rounded-sm"
          />
        </div>
        <div className=" flex gap-3 items-center">
          <div className=" flex gap-2">
            <label htmlFor="filter-minPrice">Min Price :</label>
            <input
              value={minPriceSearch}
              onChange={handledFilter}
              type="number"
              id="filter-minPrice"
              name="minPrice"
              placeholder=""
              className="border px-2 py-1 rounded-sm max-w-20"
            />
          </div>
          <div className=" flex gap-2">
            <label htmlFor="filter-maxPrice">Max Price :</label>
            <input
              value={maxPriceSearch}
              onChange={handledFilter}
              type="number"
              id="filter-maxPrice"
              name="maxPrice"
              placeholder=""
              className="border px-2 py-1 rounded-sm max-w-20"
            />
          </div>
          <div className=" flex gap-2">
            <label htmlFor="filter-inStock">Only in Stock:</label>
            <input
              checked={inStock === "true"}
              onChange={handledFilter}
              type="checkbox"
              id="filter-inStock"
              name="inStock"
              className="border px-2 py-1 rounded-sm max-w-20 cursor-pointer"
            />
          </div>
        </div>
        <div className=" my-4 flex flex-col gap-4">
          <label>Select Categories:</label>
          <ul className=" grid grid-cols-2 gap-x-8 gap-y-2">
            {CATEGORIES_LIST.map((category) => {
              return (
                <li key={category} className=" flex gap-2 items-center">
                  <input
                    checked={categoriesSearchArr?.includes(category)}
                    type="checkbox"
                    id={`${category}FilterOption`}
                    name={category}
                    value={category}
                    onChange={handleListBoxFilter}
                    className=" cursor-pointer"
                  />
                  <label
                    htmlFor={`${category}FilterOption`}
                    className=" cursor-pointer"
                  >
                    {category}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        <Button onClick={resetFilters}>RESET FILTERS</Button>
      </div>
    </>
  );
}
