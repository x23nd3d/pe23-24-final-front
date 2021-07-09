import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";
import classes from "./Dropdown.module.scss";
import ListRoute from "../../../UI/ListRoute/ListRoute";

const Dropdown = ({ mainRoute, dropdownList, dropdownOff }) => (
  <motion.div
    className={classNames(classes.dropdown)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className={classes.container}>
      <h3 className={classes.title}>Categories</h3>
      <ul className={classes.list}>
        {dropdownList.map((route) => (
          <ListRoute
            key={route}
            route={`/shop/?category=${mainRoute}&type=${route.toLowerCase()}`}
            content={route}
            onClick={dropdownOff}
            listClass={classes.listItem}
          />
        ))}
        <ListRoute
          route={`/shop/?category=${mainRoute}&all`}
          content="View all"
          onClick={dropdownOff}
          listClass={classNames(classes.listItem, classes.viewAll)}
        />
      </ul>
    </div>
  </motion.div>
);

Dropdown.defaultProps = {
  dropdownList: [],
  mainRoute: "",
  dropdownOff: (f) => f,
};

Dropdown.propTypes = {
  dropdownList: PropTypes.instanceOf(Array),
  mainRoute: PropTypes.string,
  dropdownOff: PropTypes.func,
};

export default Dropdown;
