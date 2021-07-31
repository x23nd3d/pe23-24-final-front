/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import classes from "./Profile.module.scss";

const Profile = (props) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    firstName: yup
      .string()
      .typeError("Should be a string")
      .required("Required"),
    secondName: yup
      .string()
      .typeError("Should be a string")
      .required("Required"),
    mobilePhone: yup
      .string()
      .min(10, "Must be more than 10 characters")
      .required("Required"),
    birthday: yup
      .date()
      .min(new Date(100), "Are you a mummy?")
      .max(new Date(), "Are you a time traveler?!")
      .required("Required"),
    clothesSize: yup
      .string()
      .typeError("Should be a string")
      .required("Required"),
    shoesSize: yup
      .number()
      .typeError("Should be a number")
      .required("Required"),
  });
    return (
      <div>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          secondName: "",
          mobilePhone: "",
          birthday: "",
          clothesSize: "",
          shoesSize: "",
        }}
        validateOnBlur
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
          <Form className={classes.MyAccountForm}>
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
          name="firstName"
          value={values.firstName}
          placeholder="First name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
         {touched.firstName && errors.firstName && (
                <p className={classes.Error}>{errors.firstName}</p>
              )}
      </div>
      <div className={classes.InputField}>
        <label htmlFor={classes.InputSecondName}>Second name</label>
        <input
          className={classes.Input}
          id={classes.InputSecondName}
          type="text"
          name="secondName"
          value={values.secondName}
          placeholder="Second name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
         {touched.secondName && errors.secondName && (
                <p className={classes.Error}>{errors.secondName}</p>
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
        <label htmlFor={classes.InputClothesSize}>Your clothes size</label>
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
      <button className={classes.Button}
       type="button"
      >
        Save
      </button>
            
          </Form>
        )}
      </Formik>
    </div>
    );
  };

export default Profile;
