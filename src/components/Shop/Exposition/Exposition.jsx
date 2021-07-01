import React from "react";
import PropTypes from "prop-types";
import { expo, listItem } from "./Exposition.module.scss";
import ProductCard from "./ProductCard";

const Exposition = ({ ProductList }) => (
  <ul className={expo}>
    {ProductList.map((product) => (
      <li className={listItem} key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);

Exposition.propTypes = {
  ProductList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Exposition;
