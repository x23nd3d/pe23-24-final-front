import React from "react";
import PropTypes from "prop-types";

const CurrentWishlist = ({
  currentWishItem,
  onCurrentWish,
  runCondition,
}) => (
    <>
    {runCondition(currentWishItem, onCurrentWish)}
    </>
);

CurrentWishlist.propTypes = {
  currentWishItem: PropTypes.instanceOf(Object).isRequired,
  onCurrentWish: PropTypes.func.isRequired,
  runCondition: PropTypes.func.isRequired
}

export default CurrentWishlist;