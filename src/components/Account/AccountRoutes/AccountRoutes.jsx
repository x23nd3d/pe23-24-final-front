import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import AccountDropdown from "./AccountDropdown/AccountDropdown";

const AccountRoutes = ({
  id,
  active,
  content,
  activeClass,
  listClass,
  linkClass,
  fastAccessList,
  fastAccessOff,
  toggleAccountItems,
}) => (
  <li className={classNames(listClass)}>
    <AnimatePresence>
      {active && (
        <AccountDropdown
          dropdownList={fastAccessList}
          dropdownOff={fastAccessOff}
        />
      )}
    </AnimatePresence>
    <NavLink
      to="#"
      activeClassName={activeClass}
      className={linkClass}
      onClick={(e) => toggleAccountItems(e, id)}
    >
      {content}
    </NavLink>
  </li>
);

AccountRoutes.defaultProps = {
  id: "",
  active: null,
  content: "",
  activeClass: "",
  listClass: "",
  linkClass: "",
  fastAccessList: [],
  toggleAccountItems: (f) => f,
  fastAccessOff: (f) => f,
};

AccountRoutes.propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool,
  content: PropTypes.string,
  listClass: PropTypes.string,
  linkClass: PropTypes.string,
  activeClass: PropTypes.string,
  fastAccessList: PropTypes.instanceOf(Array),
  toggleAccountItems: PropTypes.func,
  fastAccessOff: PropTypes.func,
};

export default AccountRoutes;
