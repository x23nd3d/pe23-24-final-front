import React from "react";
import classNames from "classnames";
import Navbar from "./Navbar/Navbar";
import classes from "./Header.module.scss";

const Header = (props) => (
  <>
    <header className={classes.Header}>
      <div className={classNames(classes.HeaderInner, classes.Container)}>
        <Navbar />
      </div>
    </header>
  </>
);

export default Header;
