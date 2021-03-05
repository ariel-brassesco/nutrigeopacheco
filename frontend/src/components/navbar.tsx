import React, { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import * as routes from "../routes";

export const Navbar: FC = () => {
  const [show, setShow] = useState(false);

  const showMenu = useCallback(() => setShow(!show), [show, setShow]);

  return (
    <nav
      className="navbar is-transparent has-shadow mb-4 header-menu is-size-6 has-text-weight-bold"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <p className="navbar-item is-hidden-tablet">MENU</p>
          <a
            role="button"
            className={`navbar-burger ${show ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navMenu"
            onClick={showMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navMenu" className={`navbar-menu ${show ? "is-active" : ""}`}>
          <div className="navbar-start">
            <Link className="navbar-item" to={routes.HOME} onClick={showMenu}>
              ¿Quién Soy?
            </Link>

            <Link
              className="navbar-item"
              to={routes.SERVICES}
              onClick={showMenu}
            >
              Servicios
            </Link>

            <Link
              className="navbar-item"
              to={routes.RECIPIES}
              onClick={showMenu}
            >
              Recetario
            </Link>

            <Link className="navbar-item" to={routes.STORE} onClick={showMenu}>
              Tienda Online
            </Link>

            <Link
              className="navbar-item"
              to={routes.CONTACT}
              onClick={showMenu}
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
