import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
// Import Getters
import { getItems } from "../store/cart";
// import { Account } from "../types/account";

type Props = RouteProps & {
  redirect: string;
};

export const PrivateRoute: FC<Props> = ({ children, redirect, ...props }) => {
  const items = useSelector(getItems);
  return (
    <Route
      {...props}
      render={({ location }) =>
        !!items.length ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
