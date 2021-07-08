import React, { useState } from "react";
import classNames from "classnames";

import classes from "./LoginRegistration.module.scss";

const LoginRegistration = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    let info = {};

    if (login) {
      info.email = userInfo.email;
      info.password = userInfo.password;
      info.keepSigned = userInfo.keepSigned;
    } else {
      if (userInfo.password !== userInfo.confirmedPassword)
        alert("Passwords do not match");
      info = { ...userInfo };
    }

    setUserInfo({
      firstName: "",
      secondName: "",
      email: "",
      password: "",
      confirmedPassword: "",
    });
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

export default LoginRegistration;
