import React, { FC, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

// Import Components
import { NoStockTag, PromoTag } from "./common-products";
import { ImagesShower } from "./product-shower";
import { AddToCartButton, QuantityWidget } from "../cart/common-cart";
// Import Actions
import { clearProductDetail } from "../../store/showcase";
import { addCartItem } from "../../store/cart";
// import Types
import { Product as ProductType } from "../../types";

type Props = {
  data: ProductType;
};

export const ProductDetail: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    quantity: 1,
    max: data.stock,
  });

  const decrementQuantity = () => {
    const { quantity } = state;
    if (quantity > 1) setState({ ...state, quantity: quantity - 1 });
  };

  const incrementQuantity = () => {
    const { quantity, max } = state;
    if (quantity < max) setState({ ...state, quantity: quantity + 1 });
  };

  const goBackClick = useCallback(() => {
    dispatch(clearProductDetail()); // Passing and empty object not render detail product
  }, [dispatch]);

  const addToCart = useCallback(
    (product: ProductType & { quantity: number }) => async () => {
      await dispatch(addCartItem(product));
      goBackClick();
    },
    [dispatch, goBackClick]
  );
  const promo =
    data.promotions.length > 0 ? (
      <PromoTag
        data={data.promotions[0]}
        className="tag is-danger is-align-self-flex-start"
      />
    ) : null;
  let noStock;
  if (!data.has_stock) {
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
        title="AGREGAR AL CARRITO"
        onOk={addToCart({ ...data, quantity: state.quantity })}
      />,
    ];
  }

  return (
    <div className="product-detail">
      <button
        className="button is-small is-success product-detail__btn-back"
        onClick={goBackClick}
      >
        <i className="fas fa-arrow-alt-circle-left"></i> VOLVER
      </button>
      <ImagesShower images={data.images} />
      <div className="product-detail-info">
        <h2 className="product-detail-title">{data.title}</h2>
        <div className="product-detail-description">
          {data.description.split("\n").map((line, idx) => {
            return <p key={idx}>{line}</p>;
          })}{" "}
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
