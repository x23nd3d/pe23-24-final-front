import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as yup from "yup";
import classes from "./LoginRegistration.module.scss";
import { signUp } from "../../store/actions/auth";

const Registration = (props) => {
  const validationSchema = yup.object().shape({
    name: yup.string().typeError("Should be a string").required("Necessarily"),
    secondName: yup
      .string()
      .typeError("Should be a string")
      .required("Necessarily"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Necessarily"),
    password: yup
      .string()
      .typeError("Should be a string")
      .required("Necessarily"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password mismatch")
      .required("Necessarily"),
  });
  const onSubmit = async (values) => {
    const { name, secondName, email, password } = values;
    const registered = await props.signUp(name, secondName, email, password);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          secondName: "",
          email: "",
          password: "",
          confirmPassword: "",
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
          <Form onSubmit={handleSubmit}>
            <div className={classes.InputField}>
              <input
                className={classes.Input}
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Your first name"
              />
              {touched.name && errors.name && (
                <p className={classes.Error}>{errors.name}</p>
              )}
            </div>

            <div className={classes.InputField}>
              <input
                className={classes.Input}
                type="text"
                name="secondName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.secondName}
                placeholder="Your second name"
              />
              {touched.secondName && errors.secondName && (
                <p className={classes.Error}>{errors.secondName}</p>
              )}
            </div>

            <div className={classes.InputField}>
              <input
                className={classes.Input}
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <p className={classes.Error}>{errors.email}</p>
              )}
            </div>

            <div className={classes.InputField}>
              <input
                className={classes.Input}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
              />
              {touched.password && errors.password && (
                <p className={classes.Error}>{errors.password}</p>
              )}
            </div>

            <div className={classes.InputField}>
              <input
                className={classes.Input}
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                placeholder="Confirm password"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className={classes.Error}>{errors.confirmPassword}</p>
              )}
            </div>
            <button
              className={classes.Button}
              disabled={!isValid && !dirty}
              type="submit"
            >
              REGISTER
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
Registration.defaultProps = {
  signUp: (f) => f,
};
Registration.propTypes = {
  signUp: PropTypes.func,
};
function mapDispatchToProps(dispatch) {
  return {
    signUp: (name, surname, email, password) =>
      dispatch(signUp(name, surname, email, password)),
  };
}

export default connect(null, mapDispatchToProps)(Registration);
