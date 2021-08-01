import React from "react";
import Title from "../../../UI/Section Title/Title";
import New from "./New";
import Recommended from "./Recommended";
import Popular from "./Popular";
import { collections } from "./Collections.module.scss";

const Collections = () => (
  <section className={collections}>
    <Title text="Collections" position />
    <New />
    <Recommended />
    <Popular />
  </section>
);

export default Collections;
