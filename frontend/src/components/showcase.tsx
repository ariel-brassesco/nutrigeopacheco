import React, { FC } from "react";
import { useSelector } from "react-redux";

//Import Components
import { ProductList } from "./products/product-list";
import { ProductDetail } from "./products/product-detail";
import { Loader } from "../components/Loaders";
// Import Getters
import { getProducts, getProduct } from "../store/showcase";
import { getLoading, getError } from "../store/ui";
// Import Types
import { FETCH_PRODUCTS } from "../store/showcase/types";
import { Product } from "../types";

const ProductsView: FC = () => {
  const error = useSelector(getError);
  const loading = useSelector(getLoading);
  const products = useSelector(getProducts);
  const product = useSelector(getProduct);

  if (error[FETCH_PRODUCTS]) return <p>Could not load the products.</p>;

  return loading[FETCH_PRODUCTS] ? (
    <Loader
      src="/statis/images/showcase-fruit-loader.gif"
      className="main-loader"
    />
  ) : (
    <div className="showcase">
      {Object.keys(product).length !== 0 ? ( // Check the object is not empty
        <ProductDetail data={product as Product} />
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default ProductsView;
