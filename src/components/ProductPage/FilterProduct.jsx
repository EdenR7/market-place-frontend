import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { IoIosSearch } from "react-icons/io";

import { CATEGORIES_LIST } from "../../utils/url_constants";
import PriceRangeSlider from "./RangeSlider";

export function FilterProducts(props) {
  const {
    searchParams,
    setSearchParams,
    nameSearch,
    inStock,
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
    const inputName = ev.target.name;
    const checked = ev.target.checked;
    const newCategoriesArr = checked
      ? [...categoriesSearchArr, inputName]
      : categoriesSearchArr.filter((category) => category !== inputName);
    setSearchParams((prev) => {
      prev.set("skip", 0);
      prev.set("categories", newCategoriesArr.join(","));
      return prev;
    });
  }
  function resetFilters() {
    setSearchParams((prev) => {
      prev.set("name", "");
      prev.set("minPrice", 0);
      prev.set("maxPrice", 2000);
      prev.set("inStock", "false");
      prev.set("categories", "");
      return prev;
    });
  }
  return (
    <>
      <div className=" grid gap-2 max-w-sm break-500px: mx-auto  2col:grid-cols-2 2col:max-w-4xl 2col:gap-x-16 3col:gap-x-32 3col:max-w-5xl 3col:mx-0">
        <div>
          <div className=" flex justify-between gap-2 w-full items-center">
            <div className="flex justify-between items-center border rounded-md w-2/3 overflow-hidden px-4">
              <input
                type="text"
                value={nameSearch ? nameSearch : ""}
                onChange={handledFilter}
                id="filter-name"
                name="name"
                placeholder="Search ..."
                className="py-1 focus:outline-none bg-yellow-50"
              />
              <IoIosSearch className=" text-xl text-gray-400" />
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
          <PriceRangeSlider
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className=" my-4 flex flex-col gap-4 2col:row-span-2	">
          <label className=" font-semibold">Select Categories:</label>
          <ul className=" grid grid-cols-2 gap-x-8 gap-y-2">
            {CATEGORIES_LIST.map((category) => {
              return (
                <li key={category} className=" flex gap-2 items-center">
                  <input
                    checked={
                      categoriesSearchArr
                        ? categoriesSearchArr.includes(category)
                        : false
                    }
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
        <Button onClick={resetFilters} className="max-w-40 mx-auto">
          RESET FILTERS
        </Button>
      </div>
    </>
  );
}
