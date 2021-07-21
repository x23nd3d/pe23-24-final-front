import React, { useState } from "react";
import PropTypes, { instanceOf } from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import classNames from "classnames";
import classes from "./ColorFilter.module.scss";
import FilterButton from "../../../UI/FilterButton/FilterButton";
import { getColors, joinClassNames } from "../../../../utils/sidebar.utils";
import { FilterButtons } from "../../../UI/FilterButton/FilterButton.module.scss";
import { chooseColorsFunction } from "../../../../store/actions/sidebar";

const ColorFilter = ({ shop, sidebar, history, chooseColorsHandler }) => {
  const { currentItems } = shop;
  const { search, pathname } = history.location;
  const [showMoreColors, setShowMoreColors] = useState(false);

  const showMoreColorsHandler = () => setShowMoreColors(!showMoreColors);
  const renderColors = (colors) =>
    colors
      .filter((color, index) => (showMoreColors ? color : index < 5))
      .map((color) => (
        <li key={color}>
          <NavLink
            to={search || pathname}
            onClick={() => chooseColorsHandler(color)}
            className={classNames(
              classes.Color,
              classes[joinClassNames(color)],
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
        {renderColors(getColors(currentItems))}
      </ul>
      {getColors(currentItems).length > 5 && (
        <div className={FilterButtons}>
          <FilterButton onclick={showMoreColorsHandler}>
            {showMoreColors ? "HIDE" : "SHOW"} ALL COLORS
          </FilterButton>
        </div>
      )}
    </div>
  );
};

ColorFilter.defaultProps = {
  shop: {},
  sidebar: {},
  history: {},
  chooseColorsHandler: (f) => f,
};

ColorFilter.propTypes = {
  shop: instanceOf(Object),
  sidebar: instanceOf(Object),
  history: instanceOf(Object),
  chooseColorsHandler: PropTypes.func,
};

const mapStateToProps = ({ shop, sidebar, history }) => ({
  shop,
  sidebar,
  history,
});

const mapDispatchToProps = (dispatch) => ({
  chooseColorsHandler: (color) => dispatch(chooseColorsFunction(color)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ColorFilter));
