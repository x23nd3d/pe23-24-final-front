import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import classes from "./Checkout.module.scss";
import mastercard from "../../img/icons/Checkout/mastercard.png";
import visa from "../../img/icons/Checkout/visa.png";
import express from "../../img/icons/Checkout/express.jpg";
import Button from "../UI/Buttons List/Button";

const Checkout = ({ cart, user }) => (
  <div className={classes.Checkout}>
    <div className={classes.CheckoutContainer}>
      <p>Please select your payment method</p>
      <p>Total payment amount $ {cart.total}</p>
      <div className={classes.CheckoutPayments}>
        <img
          className={classes.CheckoutPaymentImg}
          src={mastercard}
          alt="Payment 1"
        />
        <img
          className={classes.CheckoutPaymentImg}
          src={visa}
          alt="Payment 1"
        />
        <img
          className={classes.CheckoutPaymentImg}
          src={express}
          alt="Payment 1"
        />
      </div>
      <form className={classes.CheckoutForm}>
        <div className={classes.CheckoutInputField}>
          <p>Card Number: </p>
          <input
            className={classes.CheckoutInput}
            type="text"
            name="firstName"
            defaultValue=""
            onChange={() => console.log("changed")}
          />
        </div>
        <div className={classes.CheckoutInputField}>
          <p>Card Holder Name: </p>
          <input
            className={classes.CheckoutInput}
            type="text"
            name="firstName"
            defaultValue=""
            onChange={() => console.log("changed")}
          />
        </div>
        <div className={classes.CheckoutInputField}>
          <p>Card Expiry Date: </p>
          <div className={classes.PaymentCardExpiry}>
            <input
              className={classes.CheckoutInput}
              type="text"
              name="firstName"
              defaultValue=""
              placeholder="mm"
              onChange={() => console.log("changed")}
            />
            <input
              className={classes.CheckoutInput}
              type="text"
              name="firstName"
              defaultValue=""
              placeholder="yy"
              onChange={() => console.log("changed")}
            />
          </div>
        </div>
        <div className={classes.CheckoutInputField}>
          <p>CVC/CVV/CID: </p>
          <input
            className={classnames(
              classes.CheckoutInput,
              classes.CheckoutInputCVV
            )}
            type="text"
            name="firstName"
            defaultValue=""
            onChange={() => console.log("changed")}
          />
        </div>
      </form>
      <Button label="Pay" customStyle={classes.CheckoutPay} />
    </div>
  </div>
);

Checkout.defaultProps = {
  cart: {},
  user: {},
};

Checkout.propTypes = {
  cart: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
