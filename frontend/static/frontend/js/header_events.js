"use strict";
document.addEventListener(
  "click",
  (e) => {
    const elem = e.target;
    const menu = document.querySelector(".header-menu");
    showMenuMobile(elem, menu);
  },
  false
);
