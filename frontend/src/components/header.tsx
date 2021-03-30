import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Components
import { Navbar } from "./navbar";
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

  return (
    <div className="header-main">
      <div className="header-contact background-fruits--transparent">
        <img className="header-logo" src={place.logo} alt="" />
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
