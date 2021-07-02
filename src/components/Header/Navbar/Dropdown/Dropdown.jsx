import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";
import classes from "./Dropdown.module.scss";
import ListRoute from "../../../UI/ListRoute/ListRoute";

const Dropdown = ({ dropdownList }) => (
  <motion.div
    className={classNames(classes.dropdown)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className={classes.container}>
      <h3 className={classes.title}>Categories</h3>
      <ul className={classes.list}>
        {dropdownList.map((item) => (
          <ListRoute
            key={item}
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
  </motion.div>
);

Dropdown.propTypes = {
  dropdownList: PropTypes.instanceOf(Array).isRequired,
};

export default Dropdown;
