import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { NavLink, withRouter } from "react-router-dom";
import classes from "./ColorFilter.module.scss";
import { chooseColor } from "../../../../store/actions/sidebar";

const ColorFilter = ({ sidebar, shop, colorChooser }) => {
  const [showMoreColors, setShowMoreColors] = useState(false);

  // GET colors and display unique array of them
  const sourse = shop.filteredItems ? shop.filteredItems : shop.currentItems;
  const allColors = sourse.map((item) => item.color).flat();
  const setColors = [...new Set(allColors)].sort((a, b) => a.localeCompare(b));

  const showMoreColorsHandler = () => setShowMoreColors(!showMoreColors);

  return (
    <div className={classes.ColorFilter}>
      <h3 className={classes.Title}>Colors</h3>
      <ul className={classes.Colors}>
        {setColors
          .filter((item, index) =>
            showMoreColors ? index < setColors.length : index < 5
          )
          .map((color) => (
            <li key={color}>
              <NavLink
                to="#"
                onClick={() => colorChooser(color)}
                className={classNames(
                  classes.Color,
                  classes[color],
                  sidebar.chosenColor === color && classes.ColorSelected
                )}
              >
                {color}
              </NavLink>
            </li>
          ))}
      </ul>
      {setColors.length > 5 && (
        <button
          className={classes.ShowMore}
          type="button"
          onClick={showMoreColorsHandler}
        >
          Show {showMoreColors ? "Less" : "More"} Colors
        </button>
      )}
    </div>
  );
};

ColorFilter.defaultProps = {
  sidebar: {},
  shop: {},
  colorChooser: (f) => f,
};

ColorFilter.propTypes = {
  sidebar: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  colorChooser: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    colorChooser: (route) => dispatch(chooseColor(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ColorFilter));
