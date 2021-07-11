import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";
import classes from "./Dropdown.module.scss";
import ListRoute from "../../../UI/ListRoute/ListRoute";
import { receiveCurrentRoute } from "../../../../store/actions/shop";
import chooseCategory from "../../../../store/actions/sidebar";

const Dropdown = ({
  mainRoute,
  dropdownList,
  dropdownOff,
  categoryChooser,
  receiveRoute,
}) => {
  const registerRoutesHandler = (route) => {
    dropdownOff();
    receiveRoute(route);
    console.log(mainRoute, "**************************");
    categoryChooser(mainRoute);
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
                registerRoutesHandler(
                  `shop/?category=${mainRoute}&type=${route.toLowerCase()}`
                )
              }
              listClass={classes.listItem}
            />
          ))}
          <ListRoute
            route={`/shop/?category=${mainRoute}&all`}
            content="View all"
            onClick={() =>
              registerRoutesHandler(`/shop/?category=${mainRoute}&all`)
            }
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
  categoryChooser: (f) => f,
};

Dropdown.propTypes = {
  dropdownList: PropTypes.instanceOf(Array),
  mainRoute: PropTypes.string,
  dropdownOff: PropTypes.func,
  receiveRoute: PropTypes.func,
  categoryChooser: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
    sidebar: state.sidebar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveRoute: (route) => dispatch(receiveCurrentRoute(route)),
    categoryChooser: (route) => dispatch(chooseCategory(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dropdown));
