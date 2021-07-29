import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import classes from "./VisitedProducts.module.scss";

const VisitedProducts = (props) => {
  console.log("VISITED PRODUCTS:", props);

  return <h2>Visited Products</h2>;
};

VisitedProducts.defaultProps = {};
VisitedProducts.propTypes = {};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitedProducts)
);
