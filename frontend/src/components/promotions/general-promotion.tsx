import React, { FC } from "react";

import { Promotion } from "../../types";

type Props = {
  promotions: Promotion[];
};
export const GeneralPromotion: FC<Props> = ({ promotions }) => {
  let data = promotions.filter(({ target }) => target === "payment");

  return (
    <div className="promotions">
      {data.map((promo) => {
        return (
          <p key={promo.id} className="promo-gen">
            {promo.text}
          </p>
        );
      })}
    </div>
  );
};
