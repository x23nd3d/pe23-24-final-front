import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  sortByNameFunction,
  sortByPriceFunction,
} from "../../../../store/actions/sidebar";
import classes from "./Sort.module.scss";

const Sort = ({ shop, sortByNameHanler, sortByPriceHanler }) => {
  const [sortName, setSortName] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);

  return (
    <div className={classes.Sort}>
      <div className={classes.Sort}>
        <h3 className={classes.Title}>Sort</h3>
        <button
          className={classes.Button}
          type="button"
          onClick={() => {
            setSortName(!sortName);
            sortByNameHanler(shop.filteredItems, sortName);
          }}
        >
          <span>NAME</span> <span>{sortName ? "Z-A" : "A-Z"}</span>
        </button>
        <button
          className={classes.Button}
          type="button"
          onClick={() => {
            setSortPrice(!sortPrice);
            sortByPriceHanler(shop.filteredItems, sortPrice);
          }}
        >
          <span>PRICE</span> <span>{sortPrice ? "0-1" : "1-0"}</span>
        </button>
      </div>
    </div>
  );
};

Sort.defaultProps = {
  shop: {},
  sortByNameHanler: (f) => f,
  sortByPriceHanler: (f) => f,
};

Sort.propTypes = {
  shop: PropTypes.instanceOf(Object),
  sortByNameHanler: PropTypes.func,
  sortByPriceHanler: PropTypes.func,
};

const mapStateToProps = (state) => ({
  shop: state.shop,
});
const mapDispatchToProps = (dispatch) => ({
  sortByNameHanler: (items, condition) =>
    dispatch(sortByNameFunction(items, condition)),
  sortByPriceHanler: (items, condition) =>
    dispatch(sortByPriceFunction(items, condition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
