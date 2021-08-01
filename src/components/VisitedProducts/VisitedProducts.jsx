import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import VisitedProduct from "./VisitedProduct/VisitedProduct";

import classes from "./VisitedProducts.module.scss";

const VisitedProducts = ({ visitedProducts }) => (
  <div className={classes.VisitedProducts}>
    <h2 className={classes.Title}>Visited Products</h2>
    <div className={classes.List}>
      {visitedProducts.map((visitedProduct) => (
        <VisitedProduct key={visitedProduct.id} item={visitedProduct} />
      ))}
    </div>
  </div>
);

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
