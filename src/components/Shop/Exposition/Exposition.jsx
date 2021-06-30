import React from "react";
// import classNames from "classnames";
import {expo} from "./Exposition.module.scss";
import ProductCard from "./ProductCard";

const Exposition = () => (
    <ul className={expo}>
        <ProductCard />
    </ul>
);

export default Exposition;