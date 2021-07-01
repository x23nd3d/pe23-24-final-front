import React, { useState } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";
import classes from "./Dropdown.module.scss";
import ListRoute from "../../../UI/ListRoute/ListRoute";

const Dropdown = ({ dropdownList }) => (
  <div className={classNames(classes.dropdown)}>
    <div className={classes.container}>
      <h3 className={classes.title}>Categories</h3>
      <ul className={classes.list}>
        {dropdownList.map((item) => (
          <ListRoute
            route={`${item}`}
            content={item}
            listClass={classes.listItem}
          />
        ))}
        <ListRoute
          route="/"
          content="View all"
          listClass={classNames(classes.listItem, classes.viewAll)}
        />
      </ul>
    </div>
  </div>
);

Dropdown.defaultProps = {
  dropdownList: "",
};

Dropdown.propTypes = {
  dropdownList: PropTypes.string,
};

export default Dropdown;
