import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { NavLink, withRouter } from "react-router-dom";
import classes from "./ColorFilter.module.scss";

const ColorFilter = ({ sidebar, shop }) => {
  const [showMoreColors, setShowMoreColors] = useState(false);

  const getColors = (items) => {
    let colors = items.map((item) => item.color).flat();
    return (colors = [...new Set(colors)].sort((a, b) => a.localeCompare(b)));
  };

  const renderColor = (colors) =>
    colors
      .filter((color, index) => (showMoreColors ? color : index < 5))
      .map((color) => (
        <li key={color}>
          <NavLink
            to="#"
            onClick={() => console.log(color)}
            className={classNames(
              classes.Color,
              classes[color.replace(/\//g, "").split(" ").join("")]
            )}
          >
            {color}
          </NavLink>
        </li>
      ));

  return (
    <div className={classes.ColorFilter}>
      <h3 className={classes.Title}>Colors</h3>
      <ul className={classes.Colors}>
        {renderColor(getColors(shop.currentItems))}
      </ul>
      <div className={classes.Buttons}>
        <button
          className={classes.Button}
          type="button"
          onClick={() => setShowMoreColors(!showMoreColors)}
        >
          SHOW {showMoreColors ? "LESS" : "MORE"} COLORS
        </button>
      </div>
    </div>
  );
};

ColorFilter.defaultProps = {
  sidebar: {},
  shop: {},
  // receiveRoute: (f) => f,
};

ColorFilter.propTypes = {
  sidebar: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  // receiveRoute: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // receiveRoute: (route) => dispatch(receiveCurrentRoute(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ColorFilter));
