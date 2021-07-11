import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classes from "./Dropdown.module.scss";
import ListRoute from "../../../UI/ListRoute/ListRoute";
import { receiveCurrentRoute } from "../../../../store/actions/shop";

const Dropdown = ({
  mainRoute,
  dropdownList,
  dropdownOff,
  history,
  receiveRoute,
}) => {
  const chooseItem = (route) => {
    receiveRoute(route);
    dropdownOff(false);
  };

  return (
    <motion.div
      className={classNames(classes.dropdown)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={classes.container}>
        <h3 className={classes.title}>Categories</h3>
        <ul className={classes.list}>
          {dropdownList.map((route) => (
            <ListRoute
              key={route}
              route={`/shop/?category=${mainRoute}&type=${route.toLowerCase()}`}
              content={route}
              onClick={() =>
                chooseItem(
                  `shop/?category=${mainRoute}&type=${route.toLowerCase()}`
                )
              }
              listClass={classes.listItem}
              history={history}
            />
          ))}
          <ListRoute
            route={`/shop/?category=${mainRoute}&all`}
            content="View all"
            onClick={() => chooseItem(`/shop/?category=${mainRoute}&all`)}
            listClass={classNames(classes.listItem, classes.viewAll)}
          />
        </ul>
      </div>
    </motion.div>
  );
};

Dropdown.defaultProps = {
  dropdownList: [],
  mainRoute: "",
  dropdownOff: (f) => f,
  receiveRoute: (f) => f,
};

Dropdown.propTypes = {
  dropdownList: PropTypes.instanceOf(Array),
  mainRoute: PropTypes.string,
  dropdownOff: PropTypes.func,
  receiveRoute: PropTypes.func,
  history: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveRoute: (route) => dispatch(receiveCurrentRoute(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dropdown));
