import React, { FC } from "react";

type Props = {
  name: string;
  id: number;
  activated: string;
  onFilter: (id: number | null) => void;
};

export const Category: FC<Props> = ({ name, id, activated, onFilter }) => {
  let id_cat = activated ? null : id;

  return (
    //If the category is activated, deactivate
    <li className="category-item" onClick={() => onFilter(id_cat)}>
      <a className={activated}>{name}</a>
    </li>
  );
};
