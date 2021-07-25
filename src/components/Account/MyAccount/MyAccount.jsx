import React, { useState } from "react";
import classNames from "classnames";
import classes from "./MyAccount.module.scss";

import Profile from "../Profile/Profile";
import Address from "../Addresses/Address";
import Wishlist from "../Wishlist/Wishlist";
import History from "../History/History";

const MyAccount = (props) => {
  const [active, setActive] = useState(1);

  return (
    <>
      <h3 className={classes.MyAccountTitle}>My Account</h3>
      <div className={classes.MyAccountTabs}>
        <button
          className={classNames(
            classes.MyAccountTab,
            active === 1 && classes.MyAccountTabActive
          )}
          onClick={() => setActive(1)}
          type="button"
        >
          My profile
        </button>
        <button
          className={classNames(
            classes.MyAccountTab,
            active === 2 && classes.MyAccountTabActive
          )}
          type="button"
          onClick={() => setActive(2)}
        >
          My wishlist
        </button>
        <button
          className={classNames(
            classes.MyAccountTab,
            active === 3 && classes.MyAccountTabActive
          )}
          type="button"
          onClick={() => setActive(3)}
        >
          Purchase history
        </button>
        <button
          className={classNames(
            classes.MyAccountTab,
            active === 4 && classes.MyAccountTabActive
          )}
          type="button"
          onClick={() => setActive(4)}
        >
          Address book
        </button>
      </div>
      {active === 1 && <Profile />}
      {active === 2 && <Address />}
      {active === 3 && <Wishlist />}
      {active === 4 && <History />}
    </>
  );
};

export default MyAccount;
