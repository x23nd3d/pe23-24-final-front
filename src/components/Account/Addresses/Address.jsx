import React from "react";
import classes from "./Address.module.scss";

const Address = (props) => (
  <div className={classes.AddressBook}>
    <div className={classes.AddressBookDelivery}>
      <h3 className={classes.AddressBookTitle}>Address Book</h3>
      <button className={classes.Button} type="button">
        Add New Address
      </button>
    </div>
    <div className={classes.AddressBookBilling}>
      <h3 className={classes.AddressBookTitle}>Billing Book</h3>
      <button className={classes.Button} type="button">
        Add New Address
      </button>
    </div>
  </div>
);

export default Address;
