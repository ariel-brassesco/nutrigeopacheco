import React, { FC } from "react";

type Props = {
  src: string;
  className?: string;
};
export const Loader: FC<Props> = ({ src, className = "loader-generic" }) => (
  <div className={className}>
    <img src={src} alt="" />
  </div>
);
