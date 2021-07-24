// eslint-disable-next-line react/prefer-stateless-function
import React, { useState } from "react";
import CartItem from "./CartItem/CartItem";
import classes from "./Cart.module.scss";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "black jacket",
      setNumber: "3294786 - 01",
      image: "/item-1.svg",
      color: ["black"],
      size: [8],
      quantity: 1,
      price: 420,
      total: 420,
    },
    {
      id: 2,
      title: "black jacket",
      setNumber: "3294786 - 01",
      image: "/item-2.svg",
      color: ["black"],
      size: [8, 10],
      quantity: 2,
      price: 420,
      total: 840,
    },
  ]);
  return (
    <div className={classes.Cart}>
      <div className={classes.Inner}>
        <div className={classes.Carts}>
          <button className={classes.Button} type="button">
            Keep shopping
          </button>
          <ul className={classes.CartItems}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                title={item.title}
                image={item.image}
                setNumber={item.setNumber}
                color={item.color}
                size={item.size}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
          </ul>
        </div>
        <aside className={classes.Aside}>
          <h3 className={classes.CartTotal}>Shopping Cart Total</h3>
          <p className={classes.Discount}>Add a discount code</p>
          <form action="#">
            <input className={classes.DiscountCode} type="text" />
          </form>
          <p className={classes.AsideInfo}>Order value 420$</p>
          <p className={classes.AsideInfo}>Delivery Free</p>
          <p className={classes.AsideInfo}>Total 1260$</p>
          <button className={classes.Button} type="button">
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
};
export default Cart;
