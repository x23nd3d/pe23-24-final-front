import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";

import VisitedProduct from "./VisitedProduct/VisitedProduct";

import classes from "./VisitedProducts.module.scss";

const VisitedProducts = ({ visitedProducts }) => {
  console.log("VISITED PRODUCTS:", visitedProducts);

  return (
    <div className={classes.VisitedProducts}>
      <h2 className={classes.Title}>Visited Products</h2>
      {visitedProducts.map((visitedProduct) => (
        <VisitedProduct key={visitedProduct.id} item={visitedProduct} />
      ))}
    </div>
  );
};

VisitedProducts.defaultProps = {
  visitedProducts: {},
};
VisitedProducts.propTypes = {
  visitedProducts: PropTypes.instanceOf(Object),
};

const mapStateToProps = ({ visited }) => ({
  visitedProducts: visited.visitedProducts,
});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitedProducts)
);
