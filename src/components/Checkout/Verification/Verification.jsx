import React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import classnames from "classnames";
import pushNotification from "../../../utils/toastrConfig";
import classes from "./Verification.module.scss";
import Button from "../../UI/Buttons List/Button";
import verification from "../../../img/Checkout/email_confirmation.png";

const Verification = (props) => {
  const validationSchema = yup.object().shape({
    verificationCode: yup
      .number()
      .min(1, "Please type the code")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    const { cardNumber, cardName, cardExp, cardExp2, cardCvv, saveCard } =
      values;

    console.log("VALUES", values);

    // const sendCheckoutRequest = await checkoutHandler(values);
    // console.log("sendCheckoutRequest", sendCheckoutRequest);

    pushNotification(
      "success",
      "Please expect a receipt to your email",
      "Thank you for your purchase!",
      {
        toastClass: "toastr-c-success",
      }
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className={classes.Verification}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={classes.VerificationInfo}>
          <h2>Please confirm your payment</h2>
          <h4>Check your email for further clarifications.</h4>
          <img
            src={verification}
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

                <Button
                  label="Confirm"
                  submit="true"
                  customStyle={classes.CheckoutPay}
                />
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </AnimatePresence>
  );
};

export default Verification;
