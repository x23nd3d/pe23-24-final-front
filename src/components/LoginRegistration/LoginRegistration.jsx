import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { setLogin } from "../../store/actions/auth";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import classes from "./LoginRegistration.module.scss";

const LoginRegistration = ({ history, auth, setLoginTab }) => {
  const loginSwitcher = () => {
    setLoginTab(true);
  };

  const registrationSwitcher = () => {
    setLoginTab(false);
  };

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
            className={classNames(
              classes.Tab,
              auth.isLogin && classes.TabActive
            )}
            onClick={() => loginSwitcher()}
            type="button"
          >
            Sign in
          </button>
          <button
            className={classNames(
              classes.Tab,
              !auth.isLogin && classes.TabActive
            )}
            onClick={() => registrationSwitcher()}
            type="button"
          >
            Sign up
          </button>
        </div>
        {auth.isLogin ? (
          <>
            <h3 className={classes.Title}>
              Please enter your account details to log in
            </h3>
            <LoginForm history={history} />
          </>
        ) : (
          <>
            <h3 className={classes.Title}>
              To sign up, please type the required information
            </h3>
            <RegistrationForm />
          </>
        )}
      </div>
    </motion.div>
  );
};

LoginRegistration.defaultProps = {
  history: {},
  auth: {},
  setLoginTab: (f) => f,
};

LoginRegistration.propTypes = {
  history: PropTypes.instanceOf(Object),
  auth: PropTypes.instanceOf(Object),
  setLoginTab: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoginTab: (isLogin) => dispatch(setLogin(isLogin)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginRegistration));
