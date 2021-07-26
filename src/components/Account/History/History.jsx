import React, { useState } from "react";
import classes from "./History.module.scss";

const History = (props) => {
  const [length] = useState(false);

  return (
    <div className={classes.PurchaseHistory}>
      {length === true ? (
        <h3 className={classes.PurchaseHistoryTitle}>
          Your purchase history is empty
        </h3>
      ) : (
        <ul className={classes.WishlistItems}>
          <li className={classes.CartItem}>
            <div className={classes.CartItemHeader}>
              <p className={classes.CartItemOrderDate}>11/03/2018</p>
            </div>
            <div className={classes.CartItemBody}>
              <div className={classes.ImageBox}>
                <img
                  className={classes.Image}
                  src="../../../img/item-1.png"
                  alt="description"
                />
              </div>
              <div className={classes.CartItemInfoBlock}>
                <h3 className={classes.CartItemTitle}>Black Jacket</h3>
                <h4 className={classes.CartItemInfo}>ID: HE-223O </h4>
                <p className={classes.CartItemInfo}>Color: Black</p>
                <p className={classes.CartItemInfo}>Size: M</p>
                <p className={classes.CartItemInfo}>Price: 420$</p>
              </div>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default History;
