import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import * as yup from "yup";
import { Form, Formik, Field } from "formik";
import { Link } from "react-router-dom";
import classes from "./Checkout.module.scss";
import mastercard from "../../img/icons/Checkout/mastercard.png";
import visa from "../../img/icons/Checkout/visa.png";
import express from "../../img/icons/Checkout/express.jpg";
import Button from "../UI/Buttons List/Button";
import pushNotification from "../../utils/toastrConfig";
import {
  checkout,
  saveCardToStateHandler,
  saveCreditCardHandler,
  sendVerificationRequest,
} from "../../store/actions/user";
import Verification from "./Verification/Verification";
import { verificationToggle } from "../../store/actions/cart";
import Backdrop from "../UI/Backdrop/Backdrop";
import {
  allowBodyScrolling,
  preventBodyScrolling,
} from "../../utils/bodyStyling";

const Checkout = ({
  cart,
  user,
  checkoutHandler,
  saveCreditCard,
  verificationToggleHandler,
  sendVerificationRequestHandler,
  saveCardToState,
}) => {
  useEffect(() => {
    cart.isVerificationActive ? preventBodyScrolling() : allowBodyScrolling();
  }, [cart.isVerificationActive]);

  const validationSchema = yup.object().shape({
    cardNumber: yup
      .string()
      .min(16, "Minimum 16 digits")
      .max(16, "Maximum 16 digits")
      .required("Required"),
    cardName: yup.string().required("Required"),
    cardExp: yup
      .string()
      .min(2, "Minimum 2 digits")
      .max(2, "Maximum 2 digits")
      .required("Required"),
    cardExp2: yup
      .string()
      .min(2, "Minimum 2 digits")
      .max(2, "Maximum 2 digits")
      .required("Required"),
    cardCvv: yup
      .string()
      .min(3, "Minimum 3 digits")
      .max(3, "Maximum 3 digits")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    const { cardNumber, cardName, cardExp, cardExp2, cardCvv, saveCard } =
      values;

    if (saveCard) {
      saveCardToState({ cardNumber, cardName, cardExp, cardExp2, cardCvv });
    }

    sendVerificationRequestHandler();
    verificationToggleHandler(true);

    pushNotification(
      "warning",
      "Please type the verification code",
      "Payment confirmation!",
      {
        toastClass: "toastr-c-warning",
      }
    );
  };

  //
  // const sendCheckoutRequest = await checkoutHandler(values);
  // console.log("sendCheckoutRequest", sendCheckoutRequest);

  const renderTotalPrice = () => {
    if (cart.discount.code && cart.totalOff > 0) {
      const totalPrice = `$${cart.totalOff}`;
      return (
        <>
          <s>{cart.total}</s>
          <span className={classes.TotalPrice}>{totalPrice}</span>
        </>
      );
    }
    return cart.total;
  };

  return (
    <div className={classes.Checkout}>
      <div className={classes.CheckoutContainer}>
        <div className={classes.CheckoutHeader}>
          <p>Please select your payment method</p>
          <Link to="/cart" className={classes.CheckoutPayCancel}>
            Cancel
          </Link>
        </div>

        <p>Total payment amount ${renderTotalPrice()}</p>
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

        <Formik
          initialValues={{
            cardNumber: "",
            cardName: "",
            cardExp: "",
            cardExp2: "",
            cardCvv: "",
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className={classes.Inner}>
                <div className={classes.CheckoutInputField}>
                  <p>Card Number: </p>
                  <input
                    className={classes.CheckoutInput}
                    type="number"
                    name="cardNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cardNumber}
                  />
                  {touched.cardNumber && errors.cardNumber && (
                    <p className={classes.Error}>{errors.cardNumber}</p>
                  )}
                </div>
                <div className={classes.CheckoutInputField}>
                  <p>Card Holder Name: </p>
                  <input
                    className={classes.CheckoutInput}
                    type="text"
                    name="cardName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cardName}
                  />
                  {touched.cardName && errors.cardName && (
                    <p className={classes.Error}>{errors.cardName}</p>
                  )}
                </div>
                <div className={classes.CheckoutInputField}>
                  <p>Card Expiry Date: </p>
                  <div className={classes.PaymentCardExpiry}>
                    <input
                      className={classes.CheckoutInput}
                      type="number"
                      name="cardExp"
                      placeholder="mm"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cardExp}
                    />
                    {touched.cardExp && errors.cardExp && (
                      <p className={classes.Error}>{errors.cardExp}</p>
                    )}
                    <input
                      className={classes.CheckoutInput}
                      type="number"
                      name="cardExp2"
                      placeholder="yy"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cardExp2}
                    />
                    {touched.cardExp2 && errors.cardExp2 && (
                      <p className={classes.Error}>{errors.cardExp2}</p>
                    )}
                  </div>
                </div>
                <div className={classes.CheckoutInputField}>
                  <p>CVC/CVV/CID: </p>
                  <input
                    className={classnames(
                      classes.CheckoutInput,
                      classes.CheckoutInputCVV
                    )}
                    type="number"
                    name="cardCvv"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cardCvv}
                  />
                  {touched.cardCvv && errors.cardCvv && (
                    <p className={classes.Error}>{errors.cardCvv}</p>
                  )}
                </div>

                <div className={classes.CheckoutInputField}>
                  <Field
                    className={classes.Checkbox}
                    type="checkbox"
                    name="saveCard"
                    checked={user.isCardSaved || false}
                    onClick={(e) => saveCreditCard(e.target.checked)}
                  />

                  <span className={classes.CheckboxLabel}>
                    Save credit card for next purchases
                  </span>
                </div>

                <Button
                  label="Pay"
                  submit="true"
                  customStyle={classes.CheckoutPay}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {cart.isVerificationActive ? (
        <>
          <Backdrop isDark="true" />
          <Verification />
        </>
      ) : null}
    </div>
  );
};

Checkout.defaultProps = {
  cart: {},
  user: {},
  checkoutHandler: (f) => f,
  saveCreditCard: (f) => f,
  verificationToggleHandler: (f) => f,
  sendVerificationRequestHandler: (f) => f,
  saveCardToState: (f) => f,
};

Checkout.propTypes = {
  cart: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
  checkoutHandler: PropTypes.func,
  saveCreditCard: PropTypes.func,
  verificationToggleHandler: PropTypes.func,
  sendVerificationRequestHandler: PropTypes.func,
  saveCardToState: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkoutHandler: (bool) => dispatch(checkout(bool)),
    saveCreditCard: (bool) => dispatch(saveCreditCardHandler(bool)),
    verificationToggleHandler: (bool) => dispatch(verificationToggle(bool)),
    sendVerificationRequestHandler: () => dispatch(sendVerificationRequest()),
    saveCardToState: (card) => dispatch(saveCardToStateHandler(card)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
