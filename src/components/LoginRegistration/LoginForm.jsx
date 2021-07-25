import React, { useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import * as yup from "yup";
import PropTypes from "prop-types";
import classNames from "classnames";
import { auth } from "../../store/actions/auth";
import classes from "./LoginRegistration.module.scss";

const Login = (props) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    password: yup.string().required("Required"),
  });
  const [isKeepSigned, setKeepSigned] = useState(false);
  const onSubmit = async (values) => {
    const { email, password } = values;
    const authenticated = await props.auth(email, password, isKeepSigned);
    if (authenticated) props.history.push("/shop?category=all&type=all");
  };
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
            className={classNames(classes.Form, props.cart && classes.CartForm)}
            onSubmit={handleSubmit}
          >
            <div
              className={classNames(
                classes.Inner,
                props.cart && classes.CartInner
              )}
            >
              <div className={classes.InputField}>
                <input
                  className={classNames(
                    classes.Input,
                    props.cart && classes.CartInput
                  )}
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
                  className={classNames(
                    classes.Input,
                    props.cart && classes.CartInput
                  )}
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
                  className={classNames(
                    classes.Checkbox,
                    props.cart && classes.CartCheckbox
                  )}
                  id="checkbox"
                  type="checkbox"
                  defaultChecked={isKeepSigned}
                  onClick={() => setKeepSigned(!isKeepSigned)}
                />
                <span className={classes.CheckboxLabel}>Keep me signed in</span>
              </div>
              <button
                className={classNames(
                  classes.Button,
                  props.cart && classes.CartButton
                )}
                type="submit"
              >
                Log in
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
Login.defaultProps = {
  auth: (f) => f,
  history: {},
  cart: false,
};
Login.propTypes = {
  auth: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  cart: PropTypes.bool,
};
function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, keepSigned) =>
      dispatch(auth(email, password, keepSigned)),
  };
}
export default connect(null, mapDispatchToProps)(Login);
