import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";
import ListRoute from "../../UI/ListRoute/ListRoute";
import classes from "./FastAccess.module.scss";

const FastAccess = ({ mainRoute, fastAccessList, fastAccessOff }) => (
  <motion.div
    className={classNames(classes.FastAccess)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className={classes.container}>
      <h3 className={classes.FastAccessTitle}>Categories</h3>
      <ul className={classes.FastAccessList}>
        {fastAccessList.map((route) => (
          <ListRoute
            key={route}
            route={`/shop/?category=${mainRoute}&type=${route.toLowerCase()}`}
            content={route}
            onClick={fastAccessOff}
            listClass={classes.FastAccessListItem}
          />
        ))}
        <ListRoute
          route={`/shop/?category=${mainRoute}&all`}
          content="View all"
          onClick={fastAccessOff}
          listClass={classes.FastAccessListItem}
        />
      </ul>
    </div>
  </motion.div>
);

FastAccess.defaultProps = {
  fastAccessList: [],
  mainRoute: "",
  fastAccessOff: (f) => f,
};

FastAccess.propTypes = {
  fastAccessList: PropTypes.instanceOf(Array),
  mainRoute: PropTypes.string,
  fastAccessOff: PropTypes.func,
};

export default FastAccess;
