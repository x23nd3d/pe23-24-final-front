import React from "react";
import classNames from "classnames";
import classes from "./Dropdown.module.scss";
import ListRoute from "../../../UI/ListRoute/ListRoute";

const Dropdown = (props) => (
  <div className={classNames(classes.dropdown)}>
    <div className={classes.container}>
      <h3 className={classes.title}>Categories</h3>
      <ul className={classes.list}>
        <li>
          <ListRoute
            route="/"
            content="New arrivals"
            listClass={classes.listItem}
          />
        </li>
        <li>
          <ListRoute
            route="/"
            content="Jeans & Pants"
            listClass={classes.listItem}
          />
        </li>
        <li>
          <ListRoute
            route="/"
            content="Outerwear"
            listClass={classes.listItem}
          />
        </li>
        <li>
          <ListRoute
            route="/"
            content="Polos & Tees"
            listClass={classes.listItem}
          />
        </li>
        <li>
          <ListRoute
            route="/"
            content="Sweaters"
            listClass={classes.listItem}
          />
        </li>
        <li>
          <ListRoute route="/" content="Jackets" listClass={classes.listItem} />
        </li>
        <li>
          <ListRoute route="/" content="Coats" listClass={classes.listItem} />
        </li>
        <li>
          <ListRoute route="/" content="Shirts" listClass={classes.listItem} />
        </li>
      </ul>
    </div>
  </div>
);

export default Dropdown;
