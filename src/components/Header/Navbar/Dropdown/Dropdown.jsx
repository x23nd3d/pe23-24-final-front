import React from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import classes from "./Dropdown.module.scss";
import ListRoute from "../../../UI/ListRoute/ListRoute";

const Dropdown = (props) => (
  <motion.div
    className={classNames(classes.dropdown)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className={classes.container}>
      <h3 className={classes.title}>Categories</h3>
      <ul className={classes.list}>
        <ListRoute
          route="/"
          content="New arrivals"
          listClass={classes.listItem}
        />
        <ListRoute
          route="/"
          content="Jeans & Pants"
          listClass={classes.listItem}
        />
        <ListRoute route="/" content="Outerwear" listClass={classes.listItem} />
        <ListRoute
          route="/"
          content="Polos & Tees"
          listClass={classes.listItem}
        />
        <ListRoute route="/" content="Sweaters" listClass={classes.listItem} />
        <ListRoute route="/" content="Jackets" listClass={classes.listItem} />
        <ListRoute route="/" content="Coats" listClass={classes.listItem} />
        <ListRoute route="/" content="Shirts" listClass={classes.listItem} />
      </ul>
    </div>
  </motion.div>
);

export default Dropdown;
