import React, { useState } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { auth, signUp } from "../../store/actions/auth";
import classes from "./LoginRegistration.module.scss";

const LoginRegistration = (props) => {
  const [login, setLogin] = useState(true);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    keepSigned: true,
  });

  const loginSwitcher = () => {
    setLogin(true);
  };

  const registrationSwitcher = () => {
    setLogin(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleCKeepBeingSigned = (event) => {
    setUserInfo({
      ...userInfo,
      keepSigned: event.target.checked,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, secondName, email, password, keepSigned } = userInfo;

    if (login) {
      const authenticated = await props.auth(email, password, keepSigned);
      if (authenticated) props.history.push("/shop?category=all&type=all");
    } else {
      const registered = await props.signUp(
        firstName,
        secondName,
        email,
        password
      );
      if (registered) props.history.push("/login");
    }
  };

  return (
    <div className={classes.LoginRegistration}>
      <div className={classes.Inner}>
        <div className={classes.Tabs}>
          <button
            className={classNames(classes.Tab, login && classes.TabActive)}
            onClick={() => loginSwitcher()}
            type="button"
          >
            Log in
          </button>
          <button
            className={classNames(classes.Tab, !login && classes.TabActive)}
            onClick={() => registrationSwitcher()}
            type="button"
          >
            Registration
          </button>
        </div>
        <h3 className={classes.Title}>
          Please enter your account details to log in
        </h3>
        <form>
          {!login && (
            <>
              <div className={classes.InputField}>
                <input
                  className={classes.Input}
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  placeholder="Your first name"
                  onChange={handleChange}
                />
              </div>

              <div className={classes.InputField}>
                <input
                  className={classes.Input}
                  type="text"
                  name="secondName"
                  value={userInfo.secondName}
                  placeholder="Your second name"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className={classes.InputField}>
            <input
              className={classes.Input}
              type="text"
              name="email"
              value={userInfo.email}
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className={classes.InputField}>
            <input
              className={classes.Input}
              type="password"
              name="password"
              value={userInfo.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          {!login && (
            <div className={classes.InputField}>
              <input
                className={classes.Input}
                type="password"
                name="confirmedPassword"
                value={userInfo.confirmedPassword}
                placeholder="Confirm password"
                onChange={handleChange}
              />
            </div>
          )}
          {login && (
            <div className={classes.InputField}>
              <input
                className={classes.Checkbox}
                id="checkbox"
                type="checkbox"
                defaultChecked={userInfo.keepSigned}
                onClick={handleCKeepBeingSigned}
              />
              <span className={classes.CheckboxLabel}>Keep me signed in</span>
            </div>
          )}
          <button
            className={classes.Button}
            onClick={handleSubmit}
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

LoginRegistration.defaultProps = {
  auth: (f) => f,
  signUp: (f) => f,
  history: {},
};

LoginRegistration.propTypes = {
  auth: PropTypes.func,
  signUp: PropTypes.func,
  history: PropTypes.instanceOf(Object),
};

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin, keepSigned) =>
      dispatch(auth(email, password, isLogin, keepSigned)),
    signUp: (name, surname, email, password) =>
      dispatch(signUp(name, surname, email, password)),
  };
}

export default connect(null, mapDispatchToProps)(withRouter(LoginRegistration));
