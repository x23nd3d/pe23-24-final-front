import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { expo, listItem, showMoreContainer } from "./Exposition.module.scss";
import ProductCard from "./ProductCard";
import { addMoreItems, paginationSetConfig } from "../../../store/actions/shop";

const Exposition = ({
  productList,
  shop,
  paginationSetConfigHandler,
  addStepHandler,
}) => {
  const { step, leftCount } = shop;

  console.log("leftCountleftCountleftCount", leftCount);

  useEffect(() => {
    paginationSetConfigHandler();
  }, [paginationSetConfigHandler]);

  const showMoreItemsHandler = (array) => {
    const newArrayList = array.slice(0, step);

    return newArrayList.map((item) => (
      <li className={listItem} key={item.id + item.name}>
        <ProductCard item={item} />
      </li>
    ));
  };

  // const handleShowMoreItems = () => {
  //   let addStepCount = 10;
  //
  //   if (leftCount < addStepCount) {
  //     addStepCount = leftCount;
  //   }
  //
  //   if (leftCount === 0) {
  //     addStepHandler(10);
  //   }
  //   console.log("!!!", step);
  //   console.log("@@@", addStepCount);
  //   console.log("step + addStepCountstep + addStepCount", step + addStepCount);
  //
  //   addStepHandler(step + addStepCount);
  // };

  // {productList.map((item) => (
  //   <li className={listItem} key={item.id + item.name}>
  //     <ProductCard item={item} />
  //   </li>
  // ))}

  return (
    <>
      <ul className={expo}>{showMoreItemsHandler(productList)}</ul>
      {!leftCount && leftCount !== 0 ? null : (
        <div className={showMoreContainer}>
          <button type="button" onClick={() => addStepHandler(10)}>
            <i className="fas fa-redo-alt" />
          </button>
          {leftCount === 0 ? (
            <p>Show less items</p>
          ) : (
            <p>Show more {leftCount} items</p>
          )}
        </div>
      )}
    </>
  );
};

Exposition.propTypes = {
  productList: PropTypes.instanceOf(Object).isRequired,
  paginationSetConfigHandler: PropTypes.func.isRequired,
  addStepHandler: PropTypes.func.isRequired,
  shop: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    paginationSetConfigHandler: () => dispatch(paginationSetConfig()),
    addStepHandler: (count) => dispatch(addMoreItems(count)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Exposition));
