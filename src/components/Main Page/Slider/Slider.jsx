import React from "react";
import classNames from "classnames";
import classes from "./Slider.module.scss";

const Slider = (props) => (
  <section className={classes.slider}>
    <div className={classes.inner}>
      <div className={classes.info}>
        <h2 className={classes.title}> New collection </h2>
        <a className={classes.description} href="#">
          Shop now
        </a>
      </div>
      <ul className={classes.buttons}>
        <li className={classNames(classes.button, classes.active)} />
        <li className={classes.button} />
        <li className={classes.button} />
      </ul>
    </div>
  </section>
);

export default Slider;
