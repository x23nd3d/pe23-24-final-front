import React from "react";
import Title from "../../../UI/Section Title/Title";
import New from "./New";
import Recommended from "./Recommended";
import Popular from "./Popular";
import classes from "./Collections.module.scss";

const Collections = () => (
  <section className={classes.Collections}>
    <Title text="Collections" />
    <div className={classes.CollectionItems}>
      <New />
      <Recommended />
      <Popular />
    </div>
  </section>
);

export default Collections;
