import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const ListRoute = ({
  content,
  route,
  activeClass,
  listClass,
  linkClass,
  onClick = null,
}) => {
  console.log("onClick", onClick);
  return (
    <li className={classNames(listClass)}>
      <NavLink
        to={route}
        activeClassName={activeClass}
        className={linkClass}
        onClick={() => onClick(false)}
      >
        {content}
      </NavLink>
    </li>
  );
};

ListRoute.defaultProps = {
  activeClass: "",
  listClass: "",
  linkClass: "",
  onClick: (f) => f,
};

ListRoute.propTypes = {
  content: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  activeClass: PropTypes.string,
  listClass: PropTypes.string,
  linkClass: PropTypes.string,
  onClick: PropTypes.func,
};

export default ListRoute;
