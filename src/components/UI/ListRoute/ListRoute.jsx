import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const ListRoute = ({
  content,
  route,
  activeClass,
  listClass,
  linkClass,
  dropdownToggle,
}) => (
  <li className={classNames(listClass)}>
    <NavLink
      to={route}
      activeClassName={activeClass}
      className={linkClass}
      onClick={() => dropdownToggle()}
    >
      {content}
    </NavLink>
  </li>
);

ListRoute.defaultProps = {
  activeClass: "",
  listClass: "",
  linkClass: "",
  dropdownToggle: () => console.log("Dropdown toggler"),
};

ListRoute.propTypes = {
  content: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  activeClass: PropTypes.string,
  listClass: PropTypes.string,
  linkClass: PropTypes.string,
  dropdownToggle: PropTypes.func,
};

export default ListRoute;
