import React, { FC } from "react";
import { useSelector } from "react-redux";

// Import Components
import { Product } from "./product";
import { NotMatchProducts } from "./common-products";
// Import Getters
import { getFilter, getCategories } from "../../store/showcase";
// Import Types
import { Product as ProductType } from "../../types";

type Props = {
  products: ProductType[];
};

export const ProductList: FC<Props> = ({ products }) => {
  const filter = useSelector(getFilter);
  const categories = useSelector(getCategories);
  const data = products
    .filter((p) =>
      !!filter.category ? p.category.id === filter.category : true
    ) // Filter by category if it is not null
    .filter((p) =>
      !!filter.product ? p.title.toLowerCase().includes(filter.product) : true
    ); // Filter by product if it is not null

  if (data.length === 0) {
    let catMessage = categories.filter((c) => c.id === filter.category);
    const message = catMessage.length !== 0 ? catMessage[0].message : "";
    return <NotMatchProducts message={message} />;
  }

  return (
    <div className="showcase-list">
      {data.map((prod) => {
        return <Product key={prod.id} data={prod} />;
      })}
    </div>
  );
};
