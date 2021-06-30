import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const ListRoute = ({
  content,
  route,
  activeClass,
  listClass,
  linkClass,
  dropdownToggle,
  mouseEnter = null,
  mouseLeave = null,
}) => (
  <li className={classNames(listClass)}>
    <NavLink
      to={route}
      activeClassName={activeClass}
      className={linkClass}
      onClick={() => dropdownToggle()}
      onMouseEnter={() => mouseEnter(true)}
      onMouseLeave={() => mouseLeave(false)}
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
  mouseEnter: (f) => f,
  mouseLeave: (f) => f,
};

ListRoute.propTypes = {
  content: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  activeClass: PropTypes.string,
  listClass: PropTypes.string,
  linkClass: PropTypes.string,
  dropdownToggle: PropTypes.func,
  mouseEnter: PropTypes.func,
  mouseLeave: PropTypes.func,
};

export default ListRoute;
