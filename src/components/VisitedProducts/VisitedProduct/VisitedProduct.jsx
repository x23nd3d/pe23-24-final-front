import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";

import classes from "./VisitedProduct.module.scss";
import {
  colorAction,
  photoAction,
  selectCurrentItem,
  visitedProductsAction,
} from "../../../store/actions/product";

const VisitedProduct = ({
  item,
  selectCurrentItemHandler,
  dispatchColor,
  dispatchPhoto,
  dispatchVisitedProducts,
}) => {
  const dispatchProduct = () => {
    selectCurrentItemHandler(item);
    dispatchColor(item.color[0]);
    dispatchPhoto(item.photo[item.color[0]]);
    dispatchVisitedProducts(item);
  };

  return (
    <div className={classes.VisitedProduct}>
      <NavLink
        to={`/shop/product/${item.id}`}
        onClick={() => dispatchProduct()}
      >
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
  selectCurrentItemHandler: (f) => f,
  dispatchColor: (f) => f,
  dispatchPhoto: (f) => f,
  dispatchVisitedProducts: (f) => f,
};
VisitedProduct.propTypes = {
  item: PropTypes.instanceOf(Object),
  selectCurrentItemHandler: PropTypes.func,
  dispatchColor: PropTypes.func,
  dispatchPhoto: PropTypes.func,
  dispatchVisitedProducts: PropTypes.func,
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  selectCurrentItemHandler: (item) => dispatch(selectCurrentItem(item)),
  dispatchColor: (value) => dispatch(colorAction(value)),
  dispatchPhoto: (value) => dispatch(photoAction(value)),
  dispatchVisitedProducts: (value) => dispatch(visitedProductsAction(value)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitedProduct)
);
