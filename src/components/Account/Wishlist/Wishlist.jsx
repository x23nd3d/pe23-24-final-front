import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./Wishlist.module.scss";

const Wishlist = ({ image, title, id, color, size, price }) => {
  const [length] = useState(true);

  return (
    <div className={classes.MyWishlist}>
      {length === false ? (
        <h3 className={classes.MyWishlistTitle}>Your wishlist is empty</h3>
      ) : (
        <ul className={classes.MyWishlistItems}>
          <li className={classes.CartItem}>
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
            <div className={classes.Buttons}>
              <button className={classes.Button} type="button">
                Add to bascket
              </button>
              <button className={classes.Remove} type="button">
                Remove from cart
              </button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

Wishlist.defaultProps = {
  image: "",
  title: "",
  id: "",
  color: "",
  size: "",
  price: "",
};

Wishlist.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  price: PropTypes.string,
};

export default Wishlist;
