import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";
import classes from "./AccountDropdown.module.scss";
import ListRoute from "../../../UI/ListRoute/ListRoute";

const AccountDropdown = ({ dropdownList, dropdownOff }) => (
  <motion.div
    className={classNames(classes.AccountDropdown)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className={classes.container}>
      <ul className={classes.AccountList}>
        {dropdownList.map(({ content, route }) => (
          <ListRoute
            key={route}
            route={route}
            content={content}
            onClick={dropdownOff}
            listClass={classes.AccountListItem}
          />
        ))}
      </ul>
    </div>
  </motion.div>
);

AccountDropdown.defaultProps = {
  dropdownList: [],
  dropdownOff: (f) => f,
};

AccountDropdown.propTypes = {
  dropdownList: PropTypes.instanceOf(Array),
  dropdownOff: PropTypes.func,
};

export default AccountDropdown;
