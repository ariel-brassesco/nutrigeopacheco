import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";

// Import Components
import { NewProductTag, NoStockTag, PromoTag } from "./common-products";
// Import Actions
import { showProductDetail } from "../../store/showcase";
// Import Types
import { Product as ProdType } from "../../types";

type Props = {
  data: ProdType;
};

export const Product: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const { images, title, price, is_new, new_enabled, has_stock } = data;
  const { promotions } = data;
  const picture = images[0];
  const newTag = is_new && new_enabled ? <NewProductTag /> : null;
  const noStock = !has_stock ? <NoStockTag /> : null;
  const promo =
    promotions.length > 0 ? (
      <PromoTag
        data={promotions[0]}
        className="tag is-danger product-tag__new"
      />
    ) : null;

  const showDetail = useCallback(
    (product: ProdType) => () => {
      dispatch(showProductDetail(product));
    },
    [dispatch]
  );

  return (
    <div className="card showcase-item" onClick={showDetail(data)}>
      {newTag}
      {promo}
      <div className="card-image">
        <figure className="image is-1by1">
          <img src={picture} alt={title} />
        </figure>
      </div>
      <div className="card-content product-card-content">
        <p className="product-card-content__title">{title}</p>
        <span className="tag is-white is-medium product-card-content__price">
          $ {price}
        </span>
        {noStock}
      </div>
    </div>
  );
};
