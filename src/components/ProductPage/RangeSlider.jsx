import React, { useState } from "react";
import ReactSlider from "react-slider";

function PriceRangeSlider({ searchParams, setSearchParams }) {
  const minPriceSearch = searchParams.get("minPrice");
  const maxPriceSearch = searchParams.get("maxPrice");

  function updateRange(newValues) {
    setSearchParams((prev) => {
      prev.set("minPrice", newValues[0]);
      prev.set("maxPrice", newValues[1]);
      prev.set("page", 1);
      return prev;
    });
  }
  const values = [Number(minPriceSearch), Number(maxPriceSearch)];

  return (
    <div className="p-2 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Select Price Range:
      </label>
      <ReactSlider
        className="w-full h-4 my-6 relative"
        thumbClassName="w-6 h-6 bg-blue-500 rounded-full cursor-pointer transform translate-y-2"
        trackClassName="h-1 bg-gray-300"
        min={0}
        max={2000}
        step={10}
        value={values}
        onChange={(newValues) => {
          updateRange(newValues);
        }}
        renderThumb={(props, state) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={state.index}
              {...restProps}
              className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer transform -translate-y-1"
            ></div>
          );
        }}
      />
      <div className="mt-2 flex justify-between">
        <span className="block text-sm text-gray-700">Min: ${values[0]}</span>
        <span className="block text-sm text-gray-700">Max: ${values[1]}</span>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
