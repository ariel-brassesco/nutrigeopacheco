import React, { FC, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Import Components
import { NoStockTag, PromoTag } from "../components/products/common-products";
import { ImagesShower } from "../components/products/product-shower";
import {
  AddToCartButton,
  QuantityWidget,
} from "../components/cart/common-cart";
// Import Actions
import { fetchProducts } from "../store/showcase";
import { addCartItem } from "../store/cart";
// Import Getters
import { getProducts } from "../store/showcase";
// Import Types
import { Product } from "../types";
// Import Routes
import { CHECKOUT } from "../routes";

const RecipesPage: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector(getProducts);
  const data = products.find((p) => p.id === 11);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [state, setState] = useState({
    quantity: 1,
    max: data?.stock ?? 1,
  });

  const decrementQuantity = () => {
    const { quantity } = state;
    if (quantity > 1) setState({ ...state, quantity: quantity - 1 });
  };

  const incrementQuantity = () => {
    const { quantity, max } = state;
    if (quantity < max) setState({ ...state, quantity: quantity + 1 });
  };

  const addToCart = useCallback(
    (product: Product & { quantity: number }) => async () => {
      await dispatch(addCartItem(product));
      history.push(CHECKOUT);
    },
    [dispatch, history]
  );

  const promo =
    !!data && data.promotions?.length > 0 ? (
      <PromoTag
        data={data?.promotions[0]}
        className="tag is-danger is-align-self-flex-start"
      />
    ) : null;
  let noStock;
  if (!data?.has_stock) {
    noStock = <NoStockTag />;
  } else {
    noStock = [
      <QuantityWidget
        key="quantity"
        name="quantity"
        quantity={state.quantity}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
      />,
      <AddToCartButton
        key="addtocart"
        title="COMPRAR"
        onOk={addToCart({ ...data, quantity: state.quantity })}
      />,
    ];
  }

  return typeof data === "undefined" ? null : (
    <div className="box product-detail">
      <ImagesShower images={data.images} />
      <div className="product-detail-info">
        <h2 className="product-detail-title">{data.title}</h2>
        <div className="product-detail-description">
          {data.description.split("\n").map((line, idx) => {
            return <p key={idx}>{line}</p>;
          })}
          {/*Split the description by \n and put in a different <p> */}
        </div>
        <p className="product-detail-price">
          $ {data.price} {promo}
        </p>

        <hr />
        {noStock}
      </div>
    </div>
  );
};

export default RecipesPage;
