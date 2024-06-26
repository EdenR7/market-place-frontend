export const PRODUCTS_URL =
  process.env.NODE_ENV === "production"
    ? "/api/product/"
    : "http://localhost:3000/api/product/";

export const CATEGORIES_LIST = [
  "Accessories",
  "Automotive",
  "Computers",
  "Electronics",
  "Gaming",
  "Health",
  "Home Appliances",
  "Photography",
  "Smart Home",
  "Wearables",
];
