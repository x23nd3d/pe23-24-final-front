import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./Account.module.scss";
import AccountButton from "./AccountButton/AccountButton";
import MyAccount from "./MyAccount/MyAccount";

const Account = ({ user }) => {
  const buttonsInfo = [
    {
      title: "My Profile",
      description: "Show and update your personal information",
      icon: "fas fa-user-alt",
      route: "/account/profile",
    },
    {
      title: "Purchase History",
      description: "Check the status of your purchase history and returns",
      icon: "fas fa-cart-arrow-down",
      route: "/account/history",
    },
    {
      title: "My wishlist",
      description: "Manage your wishlist",
      icon: "fas fa-heart",
      route: "/account/wishlist",
    },
    {
      title: "Address book",
      description: "Save and manage your addresses",
      icon: "fas fa-list-alt",
      route: "/account/addresses",
    },
  ];

  const renderButtonList = (array) =>
    array.map(({ route, icon, description, title }) => (
      <AccountButton
        route={route}
        icon={icon}
        description={description}
        title={title}
      />
    ));

  return (
    <div className={classes.Account}>
      <div className={classes.AccountContainer}>
        {/* <div className={classes.AccountTitle}>Welcome, {user.name}</div>
        <div className={classes.AccountButtonList}>
          {renderButtonList(buttonsInfo)}
        </div> */}
        <MyAccount />
      </div>
    </div>
  );
};

Account.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    ...state,
    user: state.user.userId,
  };
}

export default connect(mapStateToProps)(Account);
