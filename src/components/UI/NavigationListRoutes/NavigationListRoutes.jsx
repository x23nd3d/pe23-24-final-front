import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dropdown from "../../Header/Navbar/Dropdown/Dropdown";

const DropdownRoute = ({
  content,
  route,
  active,
  id,
  activeClass,
  listClass,
  linkClass,
  dropdownToggle,
  dropdownMenu,
}) => {
  const activeCls = [active ? activeClass : null];

  const toggleDropdown = (idx) => {
    console.log(idx);
    dropdownToggle((prev) => !prev);
  };
  return (
    <li className={classNames(listClass)}>
      <AnimatePresence>
        {active && <Dropdown dropdownList={dropdownMenu.clothes} />}
      </AnimatePresence>
      <NavLink
        to={route}
        activeClassName={activeCls.join(" ")}
        className={linkClass}
        onClick={() => toggleDropdown(id)}
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
  id: instanceOf(Number),
  active: false,
  clothes: [],
  dropdownMenu: {},
  dropdownToggle: () => console.log("Dropdown toggler"),
};

DropdownRoute.propTypes = {
  content: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  activeClass: PropTypes.string,
  listClass: PropTypes.string,
  linkClass: PropTypes.string,
  active: PropTypes.bool,
  id: PropTypes.number,
  dropdownToggle: PropTypes.func,
  clothes: PropTypes.instanceOf(Array),
  dropdownMenu: PropTypes.instanceOf(Object),
};

export default DropdownRoute;
