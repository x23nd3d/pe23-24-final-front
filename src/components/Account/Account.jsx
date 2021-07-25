import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./Account.module.scss";
import AccountButton from "./AccountButton/AccountButton";
import { setAccountActiveTab } from "../../store/actions/user";

const Account = ({ user, setActiveTab }) => {
  const buttonsInfo = [
    {
      title: "My Profile",
      description: "Show and update your personal information",
      icon: "fas fa-user-alt",
      route: "/account/profile",
      activeTab: "profile",
    },
    {
      title: "Purchase History",
      description: "Check the status of your purchase history and returns",
      icon: "fas fa-cart-arrow-down",
      route: "/account/history",
      activeTab: "history",
    },
    {
      title: "My wishlist",
      description: "Manage your wishlist",
      icon: "fas fa-heart",
      route: "/account/wishlist",
      activeTab: "wishlist",
    },
    {
      title: "Address book",
      description: "Save and manage your addresses",
      icon: "fas fa-list-alt",
      route: "/account/address",
      activeTab: "address",
    },
  ];

  const renderButtonList = (array) =>
    array.map(({ route, icon, description, title, activeTab }) => (
      <AccountButton
        key={route}
        route={route}
        icon={icon}
        description={description}
        title={title}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
    ));

  return (
    <div className={classes.Account}>
      <div className={classes.AccountContainer}>
        <div className={classes.AccountTitle}>Welcome, {user.name}</div>
        <div className={classes.AccountButtonList}>
          {renderButtonList(buttonsInfo)}
        </div>
      </div>
    </div>
  );
};

Account.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    ...state,
    user: state.user.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveTab: (tab) => dispatch(setAccountActiveTab(tab)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
