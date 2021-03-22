import React, { FC } from "react";

type Props = {
  nameNav: string;
  nameActive?: boolean;
};

export const NavigationMenu: FC<Props> = ({
  nameNav,
  nameActive,
  children,
}) => {
  const title = nameActive ? (
    <p className="menu-label filter-label">{nameNav}</p>
  ) : null;
  return (
    <div>
      {title}
      <ul className="menu-list">{children}</ul>
    </div>
  );
};
