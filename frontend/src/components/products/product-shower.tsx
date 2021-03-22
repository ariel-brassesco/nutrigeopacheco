import React, { FC, useState } from "react";

type Props = {
  images: string[];
};
export const ImagesShower: FC<Props> = ({ images }) => {
  const [image, setImage] = useState(0);
  return (
    <div className="product-detail-images">
      <div className="imageshower-images">
        {images.map((img, idx) => {
          return (
            <figure
              key={idx}
              className="image is-96x96"
              onClick={() => setImage(idx)}
            >
              <img src={img} alt="imagen" />
            </figure>
          );
        })}
      </div>
      <figure className="imageshower-main-image is-1by1">
        <img src={images[image]} alt="imagen" />
      </figure>
    </div>
  );
};
