import React from "react";
import classNames from "classnames";
import classes from "./Dropdown.module.scss";
import ListRoute from "../../../../UI/ListRoute/ListRoute";

const Dropdown = (props) => (
  <div className={classNames(classes.dropdown)}>
    <div className={classes.container}>
      <h3 className={classes.title}>Categories</h3>
      <ul className={classes.list}>
        <li>
          <ListRoute
            route="/"
            content="New arrivals"
            classes={classes.listItem}
          />
        </li>
        <li>
          <ListRoute
            route="/"
            content="Jeans & Pants"
            classes={classes.listItem}
          />
        </li>
        <li>
          <ListRoute route="/" content="Outerwear" classes={classes.listItem} />
        </li>
        <li>
          <ListRoute
            route="/"
            content="Polos & Tees"
            classes={classes.listItem}
          />
        </li>
        <li>
          <ListRoute route="/" content="Sweaters" classes={classes.listItem} />
        </li>
        <li>
          <ListRoute route="/" content="Jackets" classes={classes.listItem} />
        </li>
        <li>
          <ListRoute route="/" content="Coats" classes={classes.listItem} />
        </li>
        <li>
          <ListRoute route="/" content="Shirts" classes={classes.listItem} />
        </li>
      </ul>
    </div>
  </div>
);

export default Dropdown;
