import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ListRoute = ({ content, route, activeClass, listClass, linkClass }) => (
  <li className={listClass}>
    <NavLink className={linkClass} to={route} activeClassName={activeClass}>
      {content}
    </NavLink>
  </li>
);

ListRoute.defaultProps = {
  activeClass: "",
  listClass: "",
  linkClass: "",
};

ListRoute.propTypes = {
  content: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  activeClass: PropTypes.string,
  listClass: PropTypes.string,
  linkClass: PropTypes.string,
};

export default ListRoute;
