import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";

import classes from "./VisitedProduct.module.scss";

const VisitedProduct = ({ item }) => {
  console.log("VISITED PRODUCT:", item);

  return (
    <div className={classes.VisitedProduct}>
      <NavLink to={`/shop/product/${item.id}`}>
        <div className={classes.ImageBox}>
          <img src={item.viewImage} alt={item.name} />
        </div>
        <div className={classes.Info}>
          <span className={classes.Name}>{item.name}</span>
          <span className={classes.Price}>${item.price}</span>
        </div>
      </NavLink>
    </div>
  );
};

VisitedProduct.defaultProps = {
  item: {},
};
VisitedProduct.propTypes = {
  item: PropTypes.instanceOf(Object),
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitedProduct)
);
