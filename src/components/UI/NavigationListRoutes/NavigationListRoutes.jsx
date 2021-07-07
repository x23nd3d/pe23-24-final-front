import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dropdown from "../../Header/Navbar/Dropdown/Dropdown";

const NavigationListRoutes = ({
  content,
  route,
  active,
  id,
  activeClass,
  listClass,
  linkClass,
  dropdownToggle,
  dropdownItems,
}) => (
  <li className={classNames(listClass)}>
    <AnimatePresence>
      {active && <Dropdown dropdownList={dropdownItems} />}
    </AnimatePresence>
    <NavLink
      to={route}
      activeClassName={activeClass}
      className={linkClass}
      onClick={(e) => dropdownToggle(e, id)}
    >
      {content}
    </NavLink>
  </li>
);
NavigationListRoutes.defaultProps = {
  activeClass: "",
  listClass: "",
  linkClass: "",
  id: instanceOf(Number),
  active: false,
  dropdownItems: {},
  dropdownToggle: (f) => f,
};

NavigationListRoutes.propTypes = {
  content: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  activeClass: PropTypes.string,
  listClass: PropTypes.string,
  linkClass: PropTypes.string,
  active: PropTypes.bool,
  id: PropTypes.number,
  dropdownToggle: PropTypes.func,
  dropdownItems: PropTypes.instanceOf(Object),
};

export default NavigationListRoutes;