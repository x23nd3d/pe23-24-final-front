import React from "react";
import classes from "./History.module.scss";

const History = (props) => (
  <div className={classes.PurchaseHistory}>
    <h3 className={classes.PurchaseHistoryTitle}>
      Your purchase history is empty
    </h3>
  </div>
);

export default History;
