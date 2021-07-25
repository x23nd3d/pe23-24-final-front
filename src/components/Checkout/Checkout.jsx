import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import * as yup from "yup";
import { Form, Formik } from "formik";
import classes from "./Checkout.module.scss";
import mastercard from "../../img/icons/Checkout/mastercard.png";
import visa from "../../img/icons/Checkout/visa.png";
import express from "../../img/icons/Checkout/express.jpg";
import Button from "../UI/Buttons List/Button";
import pushNotification from "../../utils/toastrConfig";

const Checkout = ({ cart, user }) => {
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
    const { cardNumber, cardName, cardExp, cardExp2, cardCvv } = values;
    // pushNotification(
    //   "error",
    //   "You have no rights to access the system!",
    //   "Error",
    //   {
    //     toastClass: "toastr-c-error",
    //   }
    // );
    console.log(values, "@@@@");
    console.log("cardNumber", cardNumber);
    // const authenticated = await props.auth(email, password, isKeepSigned);
    // if (authenticated) props.history.push("/shop?category=all&type=all");
  };

  const cardLengthConfig = {
    type: "Card Number",
    minLength: 16,
    maxLength: 16,
    errorMessage: ["Please enter the correct card number", ""],
    validate: false,
  };

  const cardNameLength = {
    type: "Card Name",
    minLength: 2,
    maxLength: 50,
    errorMessage: ["Please enter the correct card name", "Warning"],
    validate: false,
  };

  const cardExpiryConfig = {
    type: "Card Expiry",
    minLength: 2,
    maxLength: 2,
    errorMessage: ["Please enter proper numbers", "Incorrect Expiration Date"],
    validate: false,
  };

  const cardCvvConfig = {
    type: "Card CVV",
    minLength: 3,
    maxLength: 3,
    errorMessage: ["Please enter proper CVV code", "Incorrect CVV"],
    validate: false,
  };

  return (
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
    </div>
  );
};

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
