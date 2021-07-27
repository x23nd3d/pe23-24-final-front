import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import * as yup from "yup";
import { Form, Formik, Field } from "formik";
import { Link } from "react-router-dom";
import classes from "./Delivery.module.scss";
import {
  deliveryAddressHandler,
  deliveryHandler,
} from "../../../store/actions/user";
// import Button from "../UI/Buttons List/Button";
// import pushNotification from "../../utils/toastrConfig";

const Delivery = ({
  cart,
  user,
  deliveryHandlerMethod,
  deliveryAddressHandlerMethod,
}) => {
  const validationSchema = yup.object().shape({
    address: yup
      .string()
      .min(5, "Minimum 5 digits")
      .max(50, "Maximum 16 digits")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    const currentMethod = values.target.value;
    if (currentMethod === "myself" || currentMethod === "courier") {
      return deliveryHandlerMethod(currentMethod);
    }

    // const sendCheckoutRequest = await checkoutHandler(values);
    // console.log("sendCheckoutRequest", sendCheckoutRequest);

    //   pushNotification(
    //     "success",
    //     "Please expect a receipt to your email",
    //     "Thank you for your purchase!",
    //     {
    //       toastClass: "toastr-c-success",
    //     }
    //   );
    // };
  };

  const onBlur = (e) => {
    if (e.target.name === "delivery") {
      return;
    }

    deliveryAddressHandlerMethod(e.target.value);
  };

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
    <div className={classes.Delivery}>
      <h3>Select delivery method</h3>

      <Formik
        initialValues={{
          delivery: "",
          address: "",
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
          <Form
            className={classes.DeliveryForm}
            onChange={onSubmit}
            onBlur={onBlur}
          >
            <div className={classes.Inner}>
              <div className={classes.CheckoutInputField}>
                <div className={classes.RadioGroup}>
                  <Field
                    className={classes.Checkbox}
                    type="radio"
                    name="delivery"
                    value={"myself" || ""}
                    checked={user.deliveryMethod === "myself"}
                  />
                  Pick up by myself
                </div>
              </div>
              <div className={classes.CheckoutInputField}>
                <div className={classes.RadioGroup}>
                  <Field
                    className={classes.Checkbox}
                    type="radio"
                    name="delivery"
                    value={"courier" || ""}
                    checked={user.deliveryMethod === "courier"}
                  />
                  Courier delivery
                  {cart.deliveryPay > 0 ? ` + $${cart.deliveryPay}` : null}
                </div>
              </div>

              {user.deliveryMethod === "courier" ? (
                <div className={classes.CheckoutInputField}>
                  <input
                    className={classes.CheckoutInput}
                    type="text"
                    name="address"
                    placeholder="Your address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={
                      user.deliveryAddress ? user.deliveryAddress : ""
                    }
                  />
                  {touched.cardName && errors.cardName && (
                    <p className={classes.Error}>{errors.cardName}</p>
                  )}
                </div>
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Delivery.defaultProps = {
  cart: {},
  user: {},
  deliveryHandlerMethod: (f) => f,
  deliveryAddressHandlerMethod: (f) => f,
};

Delivery.propTypes = {
  cart: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
  deliveryHandlerMethod: PropTypes.func,
  deliveryAddressHandlerMethod: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deliveryHandlerMethod: (method) => dispatch(deliveryHandler(method)),
    deliveryAddressHandlerMethod: (address) =>
      dispatch(deliveryAddressHandler(address)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
