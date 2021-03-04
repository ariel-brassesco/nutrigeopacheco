import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Actions
import { fetchPlace } from "../store/place";
// Import Getters
import { getPlace } from "../store/place";

export const Header: FC = () => {
  const dispatch = useDispatch();
  const place = useSelector(getPlace);

  useEffect(() => {
    dispatch(fetchPlace());
  }, [dispatch]);

  console.log(place);
  return (
    <div className="header-main">
      <div className="header-contact background-fruits--transparent">
        <img className="header-logo" src={place.logo} alt="" />
      </div>
      <nav className="header-nav-bar">
        <div className="header-menu--mobile">
          <span className="icon header-menu-icon--mobile">
            <i className="fas fa-bars"></i>
          </span>
          <p className="header-menu__title">MENU</p>
        </div>
        <ul className="header-menu">
          <li className="header-menu__item">
            <a className="header-menu__link" href="\">
              inicio
            </a>
          </li>
          <li className="header-menu__item">
            <a className="header-menu__link" href="\tienda">
              tienda
            </a>
          </li>
          <li className="header-menu__item">
            <a className="header-menu__link" href="\contacto">
              contacto
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
