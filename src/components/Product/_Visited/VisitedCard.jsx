import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import {
  colorAction,
  photoAction,
  visitedProductsAction,
} from "../../../store/actions/product";
import classes from "../../Shop/Exposition/Exposition.module.scss";
import "./visited.scss";
import "../../../styles/productColors.scss";

const VisitedCard = ({
  product,
  dispatchColor,
  dispatchPhoto,
  dispatchVisitedProducts,
}) => {

  const dispatchProduct = () => {
    dispatchColor(product.color[0]);
    dispatchPhoto(product.photo[product.color[0]]);
    dispatchVisitedProducts(product);
  };

  return (
      <NavLink
        to={`/shop/product/${product.id}`}
        onClick={dispatchProduct}
        className="LinkBox"
      >
        <img
          className={classes.image}
          src={product.photo[product.color[0]][0]}
          alt="Product Item"
        />
        <div className={classes.boxBanner}>
          <div className={classes.info}>
            <span>{product.name}</span>
            <span>{product.price} $</span>
          </div>
        </div>
      </NavLink>
  );
};

VisitedCard.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
  dispatchVisitedProducts: PropTypes.func.isRequired,
};

// function mapStateToProps(state) {
//   return {
//     productStore: state.product,
//     // shop: state.shop,
//     // cart: state.cart,
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
    dispatchVisitedProducts: (value) => dispatch(visitedProductsAction(value)),
    // selectCurrentItemHandler: (item) => dispatch(selectCurrentItem(item)),
  };
}

export default connect(null, mapDispatchToProps)(withRouter(VisitedCard));
