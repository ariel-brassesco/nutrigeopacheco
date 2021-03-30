import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Actions
import { fetchPlace } from "../store/place";
// Import Getters
import { getPlace } from "../store/place";

export const Footer: FC = () => {
  const dispatch = useDispatch();
  const place = useSelector(getPlace);

  useEffect(() => {
    dispatch(fetchPlace());
  }, [dispatch]);

  return (
    <div className="footer-social-networks background-fruits--transparent">
      <p className="footer-title">{`Lic. ${place.name} ${place.surname}`}</p>
      <a href={place.instagram} className="icon-social-network">
        <i className="fab fa-2x fa-instagram"></i>
      </a>
      {place.whatsapp && (
        <a
          href={place.whatsapp}
          className="icon-social-network"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-2x fa-whatsapp"></i>
        </a>
      )}
      <a
        href={`mailto:${place.email}?subject=Consulta`}
        className="icon-social-network"
      >
        <i className="fa fa-lg fa-envelope"></i>
      </a>
      <a href={`tel:${place.phone_number}`} className="icon-social-network">
        <i className="fa fa-lg fa-phone"></i>
      </a>
    </div>
  );
};

export default Footer;
