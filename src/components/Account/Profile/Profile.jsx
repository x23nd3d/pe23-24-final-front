/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./Profile.module.scss";
import { updateUserSettingsHandler } from "../../../store/actions/user";

const Profile = ({ user, updateUserSettings }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    name: yup.string().typeError("Should be a string").required("Required"),
    surname: yup.string().typeError("Should be a string").required("Required"),
    mobilePhone: yup.string().min(10, "Must be more than 10 characters"),
    password: yup.string(),
    birthday: yup
      .date()
      .min(new Date(100), "Are you a mummy?")
      .max(new Date(), "Are you a time traveler?!"),
    clothesSize: yup.string().typeError("Should be a string"),
    shoesSize: yup.number().typeError("Should be a number"),
  });

  const onSubmit = (values) => {
    const transformedObject = { ...values };
    Object.keys(transformedObject).forEach((key) =>
      !transformedObject[key] ? delete transformedObject[key] : ""
    );
    console.log("transformedObject", transformedObject);
    updateUserSettings({ ...transformedObject });
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: user.userId.email,
          name: user.userId.name,
          surname: user.userId.surname,
          password: "",
          mobilePhone: user.userId.mobilePhone ? user.userId.mobilePhone : "",
          birthday: user.userId.birthday ? user.userId.birthday : "",
          clothesSize: user.userId.clothesSize ? user.userId.clothesSize : "",
          shoesSize: user.userId.shoesSize ? user.userId.shoesSize : "",
        }}
        validateOnBlur
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <Form className={classes.MyAccountForm} onSubmit={handleSubmit}>
            <div className={classes.InputField}>
              <label htmlFor="InputEmail">Email</label>
              <input
                className={classes.Input}
                id="InputEmail"
                type="text"
                name="email"
                value={values.email}
                placeholder="Email address"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <p className={classes.Error}>{errors.email}</p>
              )}
            </div>
            <div className={classes.InputField}>
              <label htmlFor={classes.InputFirstName}>First name</label>
              <input
                className={classes.Input}
                id={classes.InputFirstName}
                type="text"
                name="name"
                value={values.name}
                placeholder="First name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && (
                <p className={classes.Error}>{errors.name}</p>
              )}
            </div>
            <div className={classes.InputField}>
              <label htmlFor={classes.InputSecondName}>Second name</label>
              <input
                className={classes.Input}
                id={classes.InputSecondName}
                type="text"
                name="surname"
                value={values.surname}
                placeholder="Second name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.surname && errors.surname && (
                <p className={classes.Error}>{errors.surname}</p>
              )}
            </div>
            <div className={classes.InputField}>
              <label htmlFor={classes.InputMobilePhone}>Password</label>
              <input
                className={classes.Input}
                id={classes.InputMobilePhone}
                type="phone"
                name="password"
                value={values.password}
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <p className={classes.Error}>{errors.password}</p>
              )}
            </div>
            <div className={classes.InputField}>
              <label htmlFor={classes.InputMobilePhone}>Mobile phone</label>
              <input
                className={classes.Input}
                id={classes.InputMobilePhone}
                type="phone"
                name="mobilePhone"
                value={values.mobilePhone}
                placeholder="Mobile phone"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.mobilePhone && errors.mobilePhone && (
                <p className={classes.Error}>{errors.mobilePhone}</p>
              )}
            </div>
            <div className={classes.InputField}>
              <label htmlFor={classes.InputDate}>Birthday</label>
              <input
                className={classes.Input}
                id={classes.InputDate}
                type="date"
                name="birthday"
                value={values.birthday}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.birthday && errors.birthday && (
                <p className={classes.Error}>{errors.birthday}</p>
              )}
            </div>
            <div className={classes.InputField}>
              <label htmlFor={classes.InputClothesSize}>
                Your clothes size
              </label>
              <input
                className={classes.Input}
                id={classes.InputClothesSize}
                type="text"
                name="clothesSize"
                value={values.clothesSize}
                placeholder="Your clothes size"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.clothesSize && errors.clothesSize && (
                <p className={classes.Error}>{errors.clothesSize}</p>
              )}
            </div>
            <div className={classes.InputField}>
              <label htmlFor={classes.InputShoesSize}>Your shoes size</label>
              <input
                className={classes.Input}
                id={classes.InputShoesSize}
                type="text"
                name="shoesSize"
                value={values.shoesSize}
                placeholder="Your shoes size"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.shoesSize && errors.shoesSize && (
                <p className={classes.Error}>{errors.shoesSize}</p>
              )}
            </div>
            <button className={classes.Button} type="submit">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  updateUserSettings: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserSettings: (obj) => dispatch(updateUserSettingsHandler(obj)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
