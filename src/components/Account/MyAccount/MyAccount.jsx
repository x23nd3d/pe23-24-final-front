import React, { useState } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classes from "./MyAccount.module.scss";
import Profile from "../Profile/Profile";
import Address from "../Addresses/Address";
import Wishlist from "../Wishlist/Wishlist";
import History from "../History/History";
import { setAccountActiveTab } from "../../../store/actions/user";

const MyAccount = ({ user, setActiveTab, history }) => {
  const setActiveTabHandler = (tab) => {
    history.push(`/account/${tab}`);
    return setActiveTab(tab);
  };

  return (
    <div className={classes.Account}>
      <div className={classes.AccountContainer}>
        <h3 className={classes.MyAccountTitle}>My Account</h3>
        <div className={classes.MyAccountTabs}>
          <button
            className={classNames(
              classes.MyAccountTab,
              user.accountActiveTab === "profile" && classes.MyAccountTabActive
            )}
            onClick={() => setActiveTabHandler("profile")}
            type="button"
          >
            My profile
          </button>
          <button
            className={classNames(
              classes.MyAccountTab,
              user.accountActiveTab === "wishlist" && classes.MyAccountTabActive
            )}
            type="button"
            onClick={() => setActiveTabHandler("wishlist")}
          >
            My wishlist
          </button>
          <button
            className={classNames(
              classes.MyAccountTab,
              user.accountActiveTab === "history" && classes.MyAccountTabActive
            )}
            type="button"
            onClick={() => setActiveTabHandler("history")}
          >
            Purchase history
          </button>
          <button
            className={classNames(
              classes.MyAccountTab,
              user.accountActiveTab === "address" && classes.MyAccountTabActive
            )}
            type="button"
            onClick={() => setActiveTabHandler("address")}
          >
            Address book
          </button>
        </div>
        {user.accountActiveTab === "profile" && <Profile />}
        {user.accountActiveTab === "wishlist" && <Wishlist />}
        {user.accountActiveTab === "history" && <History />}
        {user.accountActiveTab === "address" && <Address />}
      </div>
    </div>
  );
};

MyAccount.defaultProps = {
  user: {},
  history: {},
  setActiveTab: (f) => f,
};

MyAccount.propTypes = {
  user: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  setActiveTab: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveTab: (tab) => dispatch(setAccountActiveTab(tab)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyAccount));
