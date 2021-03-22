import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Import Components
import Showcase from "../components/showcase";
import CategoriesNav from "../components/categories-nav";
import Cart from "../components/cart/cart";
import { WhatsappContact } from "../components/whastapp-contact";
import { BannerInfo } from "../components/common";
// Import Actions
import {
  fetchProducts,
  fetchCategories,
  fetchPromotions,
} from "../store/showcase";
// Import Getters
import { getPlace } from "../store/place";

const StorePage: FC = () => {
  const dispatch = useDispatch();
  const place = useSelector(getPlace);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchPromotions());
  }, [dispatch]);

  return (
    <div className="mainpage">
      {/* <GeneralPromotion /> */}
      {/* <GeneralAnnouncement 
                    className="promo-gen is-danger"
                    text="Cyber Monday - 25% OFF en todos los Productos."/> */}

      <Cart />
      <CategoriesNav />
      <Showcase />
      <BannerInfo />
      <WhatsappContact url={place.whatsapp ?? ""} />
    </div>
  );
};

export default StorePage;
