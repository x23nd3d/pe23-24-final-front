import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Form, Formik, Field } from "formik";
import classes from "./Delivery.module.scss";
import {
  deliveryAddressHandler,
  deliveryHandler,
  setDeliveryAddressManual,
} from "../../../store/actions/user";

const Delivery = ({
  cart,
  user,
  deliveryHandlerMethod,
  deliveryAddressHandlerMethod,
  setDeliveryAddress,
}) => {
  const validationSchema = yup.object().shape({
    address: yup
      .string()
      .min(5, "Minimum 5 digits")
      .max(50, "Maximum 16 digits")
      .required("Required"),
  });

  const renderDeliveryItems = () =>
    user.userId.savedDeliveryMethods.map((current) => (
      <button
        type="button"
        className={classes.DeliveryItems}
        onClick={() =>
          setDeliveryAddress(current.deliveryMethod, current.deliveryAddress)
        }
      >
        <div className={classes.DeliveryItemsWrapper}>
          <span>
            Method:{" "}
            {current.deliveryMethod[0].toUpperCase() +
              current.deliveryMethod.slice(1)}
          </span>{" "}
          <span>
            {current.deliveryAddress
              ? `Address: ${
                  current.deliveryAddress[0].toUpperCase() +
                  current.deliveryAddress.slice(1)
                }`
              : "Address: Store"}
          </span>
        </div>
      </button>
    ));

  const onSubmit = async (values) => {
    const currentMethod = values.target.value;
    if (currentMethod === "myself" || currentMethod === "courier") {
      deliveryHandlerMethod(currentMethod);
    }
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
          <Form className={classes.DeliveryForm} onChange={onSubmit}>
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
                    onChange={(e) =>
                      deliveryAddressHandlerMethod(e.target.value)
                    }
                    onBlur={handleBlur}
                    value={user.deliveryAddress ? user.deliveryAddress : ""}
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
            {user.userId && user.userId.savedDeliveryMethods.length > 0
              ? renderDeliveryItems()
              : null}
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
  setDeliveryAddress: (f) => f,
};

Delivery.propTypes = {
  cart: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
  deliveryHandlerMethod: PropTypes.func,
  deliveryAddressHandlerMethod: PropTypes.func,
  setDeliveryAddress: PropTypes.func,
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
    setDeliveryAddress: (method, address) =>
      dispatch(setDeliveryAddressManual(method, address)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
