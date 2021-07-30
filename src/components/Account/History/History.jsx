import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./History.module.scss";
import { getAllOrdersHandler } from "../../../store/actions/user";

const History = ({ getAllOrders, user }) => {
  const [length] = useState(false);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const { orders } = user;

  const renderAllOrders = (array) =>
    array.map((item) => (
      <li className={classes.CartItem}>
        <div className={classes.CartItemHeader}>
          <p className={classes.CartItemOrderDate}>11/03/2018</p>
        </div>
        <div className={classes.CartItemBody}>
          <div className={classes.ImageBox}>
            <img
              className={classes.Image}
              src="../../../img/item-1.png"
              alt="description"
            />
          </div>
          <div className={classes.CartItemInfoBlock}>
            <h3 className={classes.CartItemTitle}>Black Jacket</h3>
            <h4 className={classes.CartItemInfo}>ID: HE-223O </h4>
            <p className={classes.CartItemInfo}>Color: Black</p>
            <p className={classes.CartItemInfo}>Size: M</p>
            <p className={classes.CartItemInfo}>Price: 420$</p>
          </div>
        </div>
      </li>
    ));

  return (
    <div className={classes.PurchaseHistory}>
      {length === true ? (
        <h3 className={classes.PurchaseHistoryTitle}>
          Your purchase history is empty
        </h3>
      ) : (
        <ul className={classes.WishlistItems}>{renderAllOrders(orders)}</ul>
      )}
    </div>
  );
};

History.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllOrders: () => dispatch(getAllOrdersHandler()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
