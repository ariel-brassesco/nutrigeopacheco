import React, { FC, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
// Import Components
import { Category } from "./category";
import { NavigationMenu } from "./nav-menu";
import { SearchProduct } from "./search-bar";
import { Loader } from "../components/Loaders";
// Import Actions
import { filterByProduct, filterByCategory } from "../store/showcase";
// Import Getters
import { getCategories, getFilter } from "../store/showcase";
import { getLoading, getError } from "../store/ui";
// Import Types
import { FETCH_CATEGORIES } from "../store/showcase/types";

const CategoriesNav: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const loading = useSelector(getLoading);
  const categories = useSelector(getCategories);
  const filters = useSelector(getFilter);

  const searchByProduct = useCallback(
    (data: string) => dispatch(filterByProduct(data)),
    [dispatch]
  );
  const searchByCategory = useCallback(
    (catId: number | null) => dispatch(filterByCategory(catId)),
    [dispatch]
  );

  if (error[FETCH_CATEGORIES]) return <p>Could not load the categories.</p>;

  return loading[FETCH_CATEGORIES] ? (
    <Loader
      src="static/images/filters-fruit-loader.gif"
      className="main-loader"
    />
  ) : (
    <aside className="menu filters">
      <SearchProduct filterBy={searchByProduct} />
      <NavigationMenu nameNav="categorías" nameActive={true}>
        {categories.map((cat) => {
          let activated =
            cat.id === filters.category ? "is-active category-item-active" : "";
          return (
            <Category
              key={cat.id}
              {...cat}
              onFilter={searchByCategory}
              activated={activated}
            />
          );
        })}
      </NavigationMenu>
    </aside>
  );
};

export default CategoriesNav;
