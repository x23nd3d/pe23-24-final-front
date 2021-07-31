import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { fixClassNames, getColorsArray } from "../../../../utils/sidebar.utils";

import classes from "./ColorFilter.module.scss";
import { addRemoveColorFunction } from "../../../../store/actions/sidebar";

const ColorFilter = ({ shop, sidebar, history, addRemoveColorHandler }) => {
  const [showMoreColors, setShowMoreColors] = useState(false);

  const renderColors = (colors) =>
    colors
      .filter((color, index) => (showMoreColors ? color : index < 5))
      .map((color) => (
        <li key={color}>
          <NavLink
            to={history.location.search || history.location.pathname}
            onClick={() => addRemoveColorHandler(color)}
            className={classNames(
              classes.Color,
              classes[fixClassNames(color)],
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
        {renderColors(getColorsArray(shop.currentItems))}
      </ul>
      <div className={classes.Buttons}>
        {getColorsArray(shop.currentItems).length > 5 && (
          <button
            className={classes.Button}
            type="button"
            onClick={() => setShowMoreColors(!showMoreColors)}
          >
            {showMoreColors ? "SHOW LESS COLORS" : "SHOW MORE COLORS"}
          </button>
        )}
      </div>
    </div>
  );
};

ColorFilter.defaultProps = {
  shop: {},
  sidebar: {},
  history: {},
  addRemoveColorHandler: (f) => f,
};

ColorFilter.propTypes = {
  shop: PropTypes.instanceOf(Object),
  sidebar: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  addRemoveColorHandler: PropTypes.func,
};

const mapStateToProps = ({ shop, sidebar, history }) => ({
  shop,
  sidebar,
  history,
});

const mapDispatchToProps = (dispatch) => ({
  addRemoveColorHandler: (color) => dispatch(addRemoveColorFunction(color)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ColorFilter));
