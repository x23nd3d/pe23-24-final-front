import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { NavLink, withRouter } from "react-router-dom";
import classes from "./ColorFilter.module.scss";
import { addRemoveColorAction } from "../../../../store/actions/sidebar";
import { getArrayWithUniqueFlatSortedItems } from "../../../../utils/sidebar";

const ColorFilter = ({ sidebar, shop, addRemoveColorHandler }) => {
  const [showMoreColors, setShowMoreColors] = useState(false);

  const renderColor = (colors) =>
    colors
      .filter((color, index) => (showMoreColors ? color : index < 5))
      .map((color) => (
        <li key={color}>
          <NavLink
            to="#"
            onClick={() => addRemoveColorHandler(color)}
            className={classNames(
              classes.Color,
              classes[color.replaceAll("/", "").split(" ").join("")],
              sidebar.chosenColors.includes(color) && classes.ColorActive
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
        {renderColor(
          getArrayWithUniqueFlatSortedItems(shop.currentItems, "color")
        )}
      </ul>
      <div className={classes.Buttons}>
        {getArrayWithUniqueFlatSortedItems(shop.currentItems).length > 5 && (
          <button
            className={classes.Button}
            type="button"
            onClick={() => setShowMoreColors(!showMoreColors)}
          >
            SHOW {showMoreColors ? "LESS" : "MORE"} COLORS
          </button>
        )}
      </div>
    </div>
  );
};

ColorFilter.defaultProps = {
  sidebar: {},
  shop: {},
  addRemoveColorHandler: (f) => f,
};

ColorFilter.propTypes = {
  sidebar: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  addRemoveColorHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addRemoveColorHandler: (route) => dispatch(addRemoveColorAction(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ColorFilter));
