import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const ListRoute = ({
  content,
  route,
  activeClass,
  classes,
  dropdownToggle,
}) => (
  <li className={classNames(classes)}>
    <NavLink
      to={route}
      activeClassName={activeClass}
      onClick={() => dropdownToggle()}
    >
      {content}
    </NavLink>
  </li>
);

ListRoute.defaultProps = {
  activeClass: "",
  classes: "",
  dropdownToggle: () => console.log("Dropdown toggler"),
};

ListRoute.propTypes = {
  content: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  activeClass: PropTypes.string,
  classes: PropTypes.string,
  dropdownToggle: PropTypes.func,
};

export default ListRoute;
