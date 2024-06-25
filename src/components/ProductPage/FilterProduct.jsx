import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";

export function FilterProducts(props) {
  const {
    setSearchParams,
    minPriceSearch,
    maxPriceSearch,
    nameSearch,
    inStock,
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
  function resetFilters() {
    setSearchParams((prev) => {
      prev.set("name", "");
      prev.set("minPrice", "");
      prev.set("maxPrice", "");
      prev.set("inStock", "false");
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
        <Button onClick={resetFilters}>RESET FILTERS</Button>
      </div>
    </>
  );
}
