import React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import pushNotification from "../../../utils/toastrConfig";
import classes from "./Verification.module.scss";
import Button from "../../UI/Buttons List/Button";
import verificationImg from "../../../img/Checkout/email_confirmation.png";
import {
  clearCartHandler,
  verificationToggle,
} from "../../../store/actions/cart";
import {
  checkout,
  checkoutStartHandler,
  checkoutSuccessHandler,
  getUpdatesFromUser,
  verification,
} from "../../../store/actions/user";
import Spinner from "../../UI/Spinner/Spinner";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Verification = ({
  cart,
  user,
  verificationToggleHandler,
  verificationHandler,
  history,
  checkoutHandler,
  clearCart,
  checkoutStart,
  checkoutSuccess,
  getUpdatesFromUserHandler,
}) => {
  const validationSchema = yup.object().shape({
    verificationCode: yup
      .number()
      .min(1, "Please type the code")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    const { verificationCode } = values;
    const verificationCheck = await verificationHandler(verificationCode);
    if (verificationCheck.success) {
      checkoutStart();
      setTimeout(() => {
        checkoutHandler();
        checkoutSuccess();
        clearCart();
        getUpdatesFromUserHandler();
        history.push("/account/history");
      }, 3000);

      return pushNotification(
        "success",
        "Please expect a receipt to your email",
        "Thank you for your purchase!",
        {
          toastClass: "toastr-c-success",
        }
      );

      // we need to save all the data to the server and update state + create order
    }
    if (verificationCheck.attempts === 0) {
      verificationToggleHandler(false);
      history.push("/checkout");
      return pushNotification(
        "warning",
        "Please try again",
        "Too many wrong attempts",
        {
          toastClass: "toastr-c-warning",
        }
      );
    }
    pushNotification(
      "error",
      `Please try again. Your attempts: ${verificationCheck.attempts}`,
      "The code is incorrect",
      {
        toastClass: "toastr-c-error",
      }
    );
    // we need to inform that code is wrong and show attempts
  };

  return user.loading ? (
    <>
      <Backdrop isSuperDark="true" />
      <Spinner />
    </>
  ) : (
    <AnimatePresence>
      <motion.div
        className={classes.Verification}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={classes.VerificationInfo}>
          <h2>Please confirm your payment</h2>
          <h4>
            The code was sent to your email. Please check it and type the code
            into the field.
          </h4>
          <img
            src={verificationImg}
            className={classes.VerificationImg}
            alt="Verification"
          />
        </div>
        <Formik
          initialValues={{
            verificationCode: "",
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
            <Form className={classes.VerificationForm} onSubmit={handleSubmit}>
              <div className={classes.Inner}>
                <div className={classes.VerificationInput}>
                  <p>Code: </p>
                  <input
                    className={classes.ConfirmationInput}
                    type="number"
                    name="verificationCode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cardNumber}
                  />
                  {touched.verificationCode && errors.verificationCode && (
                    <p className={classes.Error}>{errors.verificationCode}</p>
                  )}
                </div>
                <div className={classes.VerificationBtnManage}>
                  <Link
                    onClick={() => verificationToggleHandler(false)}
                    to="/checkout"
                    className={classes.VerificationPayCancel}
                  >
                    Cancel
                  </Link>

                  <Button
                    label="Confirm"
                    submit="true"
                    type="submit"
                    customStyle={classes.CheckoutPay}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </AnimatePresence>
  );
};

Verification.propTypes = {
  cart: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  verificationToggleHandler: PropTypes.func.isRequired,
  verificationHandler: PropTypes.func.isRequired,
  checkoutHandler: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  checkoutStart: PropTypes.func.isRequired,
  checkoutSuccess: PropTypes.func.isRequired,
  getUpdatesFromUserHandler: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    verificationToggleHandler: (bool) => dispatch(verificationToggle(bool)),
    verificationHandler: (code) => dispatch(verification(code)),
    checkoutStart: () => dispatch(checkoutStartHandler()),
    checkoutHandler: () => dispatch(checkout()),
    checkoutSuccess: () => dispatch(checkoutSuccessHandler()),
    clearCart: () => dispatch(clearCartHandler()),
    getUpdatesFromUserHandler: () => dispatch(getUpdatesFromUser()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Verification));
