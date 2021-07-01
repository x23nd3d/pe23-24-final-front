import React from "react";
import PropTypes, { instanceOf } from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const ListRoute = ({ content, route, activeClass, listClass, linkClass }) => (
  <li className={classNames(listClass)}>
    <NavLink to={route} activeClassName={activeClass} className={linkClass}>
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
