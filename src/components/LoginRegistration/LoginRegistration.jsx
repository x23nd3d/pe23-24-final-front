import React, { useState } from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import classes from "./LoginRegistration.module.scss";

const LoginRegistration = (props) => {
  const [isLoginTab, setLoginTab] = useState(true);

  const loginSwitcher = () => {
    setLoginTab(true);
  };

  const registrationSwitcher = () => {
    setLoginTab(false);
  };

  const {history} = props;

  return (
    <motion.div
      className={classes.LoginRegistration}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={classes.Inner}>
        <div className={classes.Tabs}>
          <button
            className={classNames(classes.Tab, isLoginTab && classes.TabActive)}
            onClick={() => loginSwitcher()}
            type="button"
          >
            Log in
          </button>
          <button
            className={classNames(classes.Tab, !isLoginTab && classes.TabActive)}
            onClick={() => registrationSwitcher()}
            type="button"
          >
            Registration
          </button>
        </div>
        <h3 className={classes.Title}>
          Please enter your account details to log in
        </h3>
        {isLoginTab ?
          <LoginForm history={history} />
        :
          <RegistrationForm />
        }
      </div>
    </motion.div>
  );
};

LoginRegistration.defaultProps = {
  history: {},
};

LoginRegistration.propTypes = {
  history: PropTypes.instanceOf(Object),
};


export default (withRouter(LoginRegistration));
