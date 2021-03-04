import React, { Component } from "react";

import { Link } from "react-router-dom";

const Crum = (props) => {
  const { activeClassName, path, title } = props;
  return (
    <li className={activeClassName}>
      <Link to={path}>{title}</Link>
    </li>
  );
};

export const NavBar = (props) => {
  const { crums } = props;
  return (
    <nav className="breadcrumb nav-breadcrumb" aria-label="breadcrumbs">
      <ul>
        {crums.map((crum, idx) => {
          return (
            <Crum
              key={idx}
              {...crum}
              activeClassName={crums.length === idx + 1 ? "is-active" : ""}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export const Category = (props) => {
  const { name, id, slug, activated, filterBy } = props;
  let id_cat = activated ? null : id;
  let url = activated ? "" : slug;

  return (
    //If the category is activated, deactivate
    <li className="category-item" onClick={filterBy.bind(null, id_cat, url)}>
      <a className={activated}>{name}</a>
    </li>
  );
};

export class SearchProduct extends Component {
  state = {
    inputSearch: "",
  };

  _handleChange = (e) => {
    this.setState({ inputSearch: e.target.value });
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    const { inputSearch } = this.state;
    this.props.filterBy(inputSearch); //Dispatch the search
    this.setState({ inputSearch: "" }); //Reset the input
  };

  render() {
    let value = this.state.inputSearch;
    return (
      <form onSubmit={this._handleSubmit}>
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              onChange={this._handleChange}
              type="text"
              placeholder="Buscar Producto..."
              value={value}
            />
          </div>
          <div className="control">
            <button className="button is-success" type="submit">
              <span className="icon">
                <i className="fas fa-search"></i>
              </span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export class NavigationMenu extends Component {
  render() {
    const { nameNav, nameActive, children } = this.props;
    const title = nameActive ? (
      <p className="menu-label filter-label">{nameNav}</p>
    ) : null;
    return (
      <div>
        {title}
        <ul className="menu-list">{children}</ul>
      </div>
    );
  }
}
