import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./History.module.scss";
import { getAllOrdersHandler } from "../../../store/actions/user";
import getHumanLookDate from "../../../utils/history";

const History = ({ getAllOrders, user }) => {
  const [length] = useState(false);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const { orders } = user.userId;
  const totalSum = () => {
    let total = 0;

    orders.forEach((item) => (total += item.cart.total));

    return total;
  };

  const renderAllOrders = (array) =>
    array.map((item) => (
      <li className={classes.CartItem} key={item.orderID}>
        <div className={classes.CartItemHeader}>
          <p className={classes.CartItemOrderDate}>
            {getHumanLookDate(item.date)}
          </p>
          <p className={classes.CartItemOrderID}>Order ID: {item.orderID}</p>
        </div>
        <div className={classes.CartItemBody}>
          <ul className={classes.PurchasedItems}>
            {item.cart.items.map((cartItem) => (
              <li className={classes.PurchasedItem} key={cartItem.id}>
                <div className={classes.ImageBox}>
                  <img
                    className={classes.Image}
                    src={cartItem.viewImage}
                    alt="description"
                  />
                </div>
                <div className={classes.CartItemInfoBlock}>
                  <h3 className={classes.CartItemTitle}>{cartItem.name}</h3>
                  <h4 className={classes.CartItemInfo}>ID: {cartItem.id} </h4>
                  <p className={classes.CartItemInfo}>
                    Color: {cartItem.color}
                  </p>
                  {cartItem.size ? (
                    <p className={classes.CartItemInfo}>
                      Size: {cartItem.size}
                    </p>
                  ) : null}
                  <p className={classes.CartItemInfo}>
                    Price: ${cartItem.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.CartItemFooter}>
          <div className={classes.Delivery}>
            {item.cart.deliveryPay !== 0 && (
              <span className={classes.Delivery}>
                DELIVERY: ${item.cart.deliveryPay}
              </span>
            )}
          </div>
          Total:{" "}
          {item.cart.totalOff ? (
            <span>
              <span className={classes.TotalCross}>${item.cart.total}</span> $
              {item.cart.totalOff}
            </span>
          ) : (
            item.cart.total
          )}
          {item.cart.totalOff && (
            <p className={classes.Saved}>
              You save: ${item.cart.offSaved} /{" "}
              {item.cart.discount.code.percentage}%
            </p>
          )}
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
      <div className={classes.Total}>TOTAL PAID: ${totalSum()}</div>
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
