import React from "react";
import classes from "./Shop.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Exposition from "./Exposition/Exposition";
import LoginRegistration from "../LoginRegistration/LoginRegistration";

const Shop = (props) => {
  const list = [
    { name: "name1", price: "pr1", id: "222" },
    { name: "name2", price: "pr2", id: "223" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
  ];

  return (
    // <div className={classes.Shop}>
    //   <Sidebar />
    //   <Exposition ProductList={list} />
    // </div>
    <LoginRegistration />
  );
};

export default Shop;
