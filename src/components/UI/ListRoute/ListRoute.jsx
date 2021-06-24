import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ListRoute = ({ content, route, activeClass, classes }) => (
  <li className={classes}>
    <NavLink to={route} activeClassName={activeClass}>
      {content}
    </NavLink>
  </li>
);

ListRoute.defaultProps = {
  activeClass: "",
  classes: "",
};

ListRoute.propTypes = {
  content: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  activeClass: PropTypes.string,
  classes: PropTypes.string,
};

export default ListRoute;
