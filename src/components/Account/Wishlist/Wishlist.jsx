import React from "react";
import classes from "./Wishlist.module.scss";

const Wishlist = (props) => (
  <div className={classes.MyWishlist}>
    <h3 className={classes.MyWishlistTitle}>Your wishlist is empty</h3>
  </div>
);

export default Wishlist;
