export const PRODUCTS_URL =
  process.env.NODE_ENV === "production"
    ? "/api/product/"
    : "http://localhost:3000/api/product/";
