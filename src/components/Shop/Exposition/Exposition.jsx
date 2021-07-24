import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import {
  expo,
  listItem,
  NoItemsWarning,
  ExpositionInner,
  showMoreContainer,
  showMoreBtn,
  showMoreAnim,
} from "./Exposition.module.scss";

import ProductCard from "./ProductCard";
import { addMoreItems, paginationSetConfig } from "../../../store/actions/shop";

const Exposition = ({
  productList,
  shop,
  paginationSetConfigHandler,
  addStepHandler,
}) => {
  const { step, leftCount, allItemsCount } = shop;

  const showMoreItemsHandler = (array) => {
    const showCount = allItemsCount - leftCount;
    const newArrayList = array.slice(0, showCount);

    return newArrayList.map((item) => (
      <li className={listItem} key={item.id + item.name}>
        <ProductCard item={item} />
      </li>
    ));
  };

  const iconCls = ["fas fa-sync", shop.paginationLoading ? showMoreAnim : null];

  return (
    <>
      <div className={ExpositionInner}>
        {!Array.isArray(productList) ? (
          <p className={NoItemsWarning}>{productList}</p>
        ) : (
        <ul className={expo}>
          {showMoreItemsHandler(
            shop.filteredItems.length ? shop.filteredItems : productList
          ))}
        </ul>
        )}
        {!leftCount && leftCount !== 0 ? null : (
          <div className={showMoreContainer}>
            <button
              className={showMoreBtn}
              type="button"
              onClick={() => addStepHandler(step)}
            >
              <i className={iconCls.join(" ")} />
              {leftCount === 0 ? (
                <p>Show less items</p>
              ) : (
                <p>
                  Show {leftCount} more {leftCount >= 10 ? "items" : "item"}
                </p>
              )}
            </button>
          </div>
        )}
      </div>
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
