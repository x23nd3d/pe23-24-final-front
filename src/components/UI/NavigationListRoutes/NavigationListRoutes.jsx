import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import classNames from "classnames";
import { NavLink, withRouter } from "react-router-dom";
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
  dropdownOff,
  dropdownItems,
}) => (
  <li
    data-testid="NavigationListRoutesTestId"
    className={classNames(listClass)}
  >
    <AnimatePresence>
      {active && (
        <Dropdown
          mainRoute={content.toLowerCase()}
          dropdownList={dropdownItems}
          dropdownOff={dropdownOff}
        />
      )}
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
  content: "",
  route: "",
  activeClass: "",
  listClass: "",
  linkClass: "",
  id: instanceOf(Number),
  active: false,
  dropdownItems: {},
  dropdownToggle: (f) => f,
  dropdownOff: (f) => f,
};

NavigationListRoutes.propTypes = {
  content: PropTypes.string,
  route: PropTypes.string,
  activeClass: PropTypes.string,
  listClass: PropTypes.string,
  linkClass: PropTypes.string,
  active: PropTypes.bool,
  id: PropTypes.number,
  dropdownToggle: PropTypes.func,
  dropdownOff: PropTypes.func,
  dropdownItems: PropTypes.instanceOf(Object),
};

export default withRouter(NavigationListRoutes);
