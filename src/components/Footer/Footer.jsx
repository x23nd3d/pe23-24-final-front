import React from "react";
import classes from "./Footer.module.scss";
import ListRoute from "../UI/ListRoute/ListRoute";
import { ReactComponent as ArrowDown } from "./Footer img/arrow-down.svg";

const Footer = () => {
  const footerListItems = {
    helpSection: [
      { content: "Frequently asked questions", route: "/faq" },
      { content: "Contact", route: "/contact" },
      { content: "How to purchase", route: "/how-to-purchase" },
      { content: "Payment", route: "/payment" },
    ],
    followUsSection: [
      { content: "Facebook", route: "/facebook" },
      { content: "Instagram", route: "/instagram" },
      { content: "Pinterest", route: "/pinterest" },
    ],
    companySection: [
      { content: "History of the brand", route: "/history" },
      { content: "Policy", route: "/policy" },
      { content: "Work with Us", route: "/join-us" },
    ],
  };

  const renderListItems = (listArray) =>
    listArray.map(
      ({
        listCls = classes.FooterListItem,
        linkCls = classes.FooterLinkItem,
        activeCls = classes.FooterLinkActive,
        content,
        route = "/",
      }) => (
        <ListRoute
          key={content}
          listClass={listCls}
          linkClass={linkCls}
          activeClass={activeCls}
          route={route}
          content={content}
        />
      )
    );

  return (
    <div className={classes.Footer}>
      <div className={classes.FooterColumn}>
        <div className={classes.ArrowDownColumnContainer}>
          <h3>Help</h3>
          <ArrowDown className={classes.ArrowDown} />
        </div>

        <ul className={classes.FooterColumnList}>
          {renderListItems(footerListItems.helpSection)}
        </ul>
      </div>
      <div className={classes.FooterColumn}>
        <div className={classes.ArrowDownColumnContainer}>
          <h3>Follow Us</h3>
          <ArrowDown className={classes.ArrowDown} />
        </div>
        <ul className={classes.FooterColumnList}>
          {renderListItems(footerListItems.followUsSection)}
        </ul>
      </div>
      <div className={classes.FooterColumn}>
        <div className={classes.ArrowDownColumnContainer}>
          <h3>Company</h3>
          <ArrowDown className={classes.ArrowDown} />
        </div>
        <ul className={classes.FooterColumnList}>
          {renderListItems(footerListItems.companySection)}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
