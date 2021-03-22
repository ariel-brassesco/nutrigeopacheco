import React, { FC } from "react";

export const NotMatchProducts: FC<{ message: string }> = ({ message }) => (
  <p className="no-match-products">
    {message !== "" ? message : "NO HAY PRODUCTOS PARA MOSTRAR"}
  </p>
);

export const NewProductTag = () => {
  return <span className="tag is-success product-tag__new">nuevo</span>;
};

export const NoStockTag = () => {
  return <span className="tag is-danger product-tag__nostock">sin stock</span>;
};

export const PromoTag = ({ data, className }) => {
  const { _type, is_active, text } = data;

  if (!is_active) return null;

  switch (_type) {
    case "percent":
      return <span className={className}>{`${text}% OFF`}</span>;
    default:
      return null;
  }
};
