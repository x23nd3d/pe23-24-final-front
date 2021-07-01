import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const DropdownRoute = ({
  content,
  route,
  active,
  activeClass,
  listClass,
  linkClass,
  dropdownToggle,
}) => {
  const activeCls = [active ? activeClass : null];
  return (
    <li className={classNames(listClass)}>
      <NavLink
        to={route}
        activeClassName={activeCls.join(" ")}
        className={linkClass}
        onClick={() => dropdownToggle()}
      >
        {content}
      </NavLink>
    </li>
  );
};

DropdownRoute.defaultProps = {
  activeClass: "",
  listClass: "",
  linkClass: "",
  active: false,
  dropdownToggle: () => console.log("Dropdown toggler"),
};

DropdownRoute.propTypes = {
  content: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  activeClass: PropTypes.string,
  listClass: PropTypes.string,
  linkClass: PropTypes.string,
  active: PropTypes.bool,
  dropdownToggle: PropTypes.func,
};

export default DropdownRoute;
