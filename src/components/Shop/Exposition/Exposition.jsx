import React from "react";
import PropTypes from "prop-types";
import { expo, listItem } from "./Exposition.module.scss";
import ProductCard from "./ProductCard";

const Exposition = ({ productList }) => (
  <ul className={expo}>
    {productList.map((product) => (
      <li className={listItem} key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);

Exposition.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Exposition;
