import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import classnames from "classnames";
import classes from "./AddNewAddressItem.module.scss";
import Modal from "../../../UI/Modal/Modal";
import Button from "../../../UI/Buttons List/Button";
import pushNotification from "../../../../utils/toastrConfig";

const AddNewAddressItem = ({
  modalContent,
  setModalContent,
  sendCardRequest,
  sendAddressRequest,
}) => {
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
  const validationSchemaAdd = yup.object().shape({
    address: yup.string().required("Required"),
  });

  const onSubmitAddress = async (value) => {
    const address = {
      deliveryMethod: "courier",
      deliveryAddress: value.address,
      isDeliverySaved: true,
    };
    const response = await sendAddressRequest(address);

    if (!response.error) {
      setModalContent(null);
      return pushNotification(
        "success",
        "The address was successfully saved",
        "Thank you",
        {
          toastClass: "toastr-c-success",
        }
      );
    }

    return pushNotification("error", response.error, "Wrong request", {
      toastClass: "toastr-c-error",
    });
  };

  const onSubmitCard = async (card) => {
    const response = await sendCardRequest(card);

    if (!response.error) {
      setModalContent(null);
      return pushNotification(
        "success",
        "The card was successfully saved",
        "Thank you",
        {
          toastClass: "toastr-c-success",
        }
      );
    }

    return pushNotification("error", response.error, "Wrong request", {
      toastClass: "toastr-c-error",
    });
  };

  return (
    <>
      {modalContent === "AddNewCard" && (
        <Modal functionClose={() => setModalContent(null)}>
          <div className={classes.Checkout}>
            <div className={classes.CheckoutContainer}>
              <div className={classes.CheckoutHeader}>
                <button
                  type="button"
                  onClick={() => setModalContent(null)}
                  className={classes.CheckoutPayCancel}
                >
                  Cancel
                </button>
              </div>
              <Formik
                initialValues={{
                  cardNumber: "",
                  cardName: "",
                  cardExp: "",
                  cardExp2: "",
                  cardCvv: "",
                }}
                onSubmit={onSubmitCard}
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
                          <p className={classes.ErrorError}>
                            {errors.cardNumber}
                          </p>
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
                          <p className={classes.ErrorError}>
                            {errors.cardName}
                          </p>
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
                            <p className={classes.ErrorError}>
                              {errors.cardExp}
                            </p>
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
                            <p className={classes.ErrorError}>
                              {errors.cardExp2}
                            </p>
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
                          <p className={classes.ErrorError}>{errors.cardCvv}</p>
                        )}
                      </div>
                      <Button submit="true" label="ADD" />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Modal>
      )}

      {modalContent === "AddNewAddress" && (
        <Modal functionClose={() => setModalContent(null)}>
          <AnimatePresence>
            <motion.div
              className={classes.Verification}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Formik
                initialValues={{
                  address: "",
                }}
                onSubmit={onSubmitAddress}
                validationSchema={validationSchemaAdd}
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
                    className={classes.VerificationForm}
                    onSubmit={handleSubmit}
                  >
                    <p className={classes.VerText}>
                      Please enter your address:
                    </p>
                    <div className={classes.Inner}>
                      <div className={classes.VerificationInput}>
                        {/* <p>ADDRESS: </p> */}
                        <input
                          className={classes.ConfirmationInput}
                          type="text"
                          name="address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.cardNumber}
                          placeholder="Your address"
                        />
                        {touched.address && errors.address && (
                          <p className={classes.Error}>{errors.address}</p>
                        )}
                      </div>
                      <div className={classes.VerificationBtnManage}>
                        <button
                          type="button"
                          onClick={() => setModalContent(null)}
                          className={classes.VerificationPayCancel}
                        >
                          Cancel
                        </button>

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
        </Modal>
      )}
    </>
  );
};

AddNewAddressItem.defaultProps = {
  modalContent: "",
  setModalContent: () => {},
  sendCardRequest: (f) => f,
  sendAddressRequest: (f) => f,
};

AddNewAddressItem.propTypes = {
  modalContent: PropTypes.string,
  setModalContent: PropTypes.func,
  sendCardRequest: PropTypes.func,
  sendAddressRequest: PropTypes.func,
};

export default AddNewAddressItem;
