import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import AddToCartForm from "../Forms/Add to Cart/AddToCartForm";
import SlideShow from "./SlideShow/SlideShow";
import {
  colorAction,
  photoAction,
  toggleCurrentPreviewItemHandler,
} from "../../store/actions/product";
import VisitedProducts from "../VisitedProducts/VisitedProducts";
import Available from "../UI/SVGIconsComponents/Available";
import Unavailable from "../UI/SVGIconsComponents/Unavailable";
import ProductTag from "../UI/ProductTag/ProductTag";

import {
  productPage,
  Details,
  collectionTags,
  topBlock,
  NameBox,
  PriceBox,
  inputBlock,
  Title,
  Name,
  Caption,
  dataPointer,
  Price,
  moreDetails,
  bottomBlock,
  dsc,
  dataBlock,
  isStock,
} from "./Product.module.scss";

const Product = ({
  data,
  productStore,
  dispatchColor,
  dispatchPhoto,
  toggleCurrentPreviewItem,
}) => {
  const store = { productStore, dispatchColor };

  const {
    name,
    caption,
    category,
    material,
    type,
    photo,
    price,
    description,
    producingCountry,
  } = data;

  useEffect(() => {
    dispatchPhoto(photo[productStore.color]);
  }, [productStore.color]);

  return (
    <>
      <section className={productPage}>
        <SlideShow photo={productStore.photo} alt={`${material}${category}`} />
        <article className={dataBlock}>
          <ul className={classNames(Details)}>
            <li className={topBlock}>
              <header className={classNames(Title)}>
                <div className={NameBox}>
                  <h2 className={classNames(Name)}>{name}</h2>
                  {productStore.currentItem.new && (
                    <div
                      style={{ background: "#b30808", color: "#fff" }}
                      className={collectionTags}
                    >
                      <ProductTag item={productStore.currentItem} tag="New" />
                    </div>
                  )}
                  {productStore.currentItem.recommended && (
                    <div
                      style={{ background: "#9d00ff", color: "#fff" }}
                      className={collectionTags}
                    >
                      <ProductTag
                        item={productStore.currentItem}
                        tag="Recommended"
                      />
                    </div>
                  )}
                  {productStore.currentItem.ordered >= 120 && (
                    <div
                      style={{ background: "#00ff43", color: "#000" }}
                      className={collectionTags}
                    >
                      <ProductTag
                        item={productStore.currentItem}
                        tag="Popular"
                      />
                    </div>
                  )}
                </div>
                <p className={classNames(Caption)}>{caption}</p>
              </header>
              <div className={PriceBox}>
                <span className={classNames(dataPointer, Price)}>
                  Price<p>{`$${price}`}</p>
                </span>
                <div className={isStock}>
                  <span>Available</span>
                  {productStore.currentItem.stock ? (
                    <Available />
                  ) : (
                    <Unavailable />
                  )}
                </div>
              </div>
            </li>

            <li className={inputBlock}>
              <AddToCartForm data={data} store={store} />
              <hr />
            </li>

            <li className={bottomBlock}>
              <h3 className={moreDetails}>More details</h3>
              <span className={dataPointer}>
                <h5>Type</h5>
                <p>{type}</p>
              </span>
              <span className={dataPointer}>
                <h5>Material</h5>
                <p>{material}</p>
              </span>
              <ul className={dsc}>
                {description.map((point) => (
                  <li
                    key={`${point.slice(-3)}${Math.random() * 50}${point.slice(
                      0,
                      5
                    )}`}
                  >
                    {point}
                  </li>
                ))}
              </ul>
              {producingCountry && (
                <p style={{ margin: "10px 0" }}>Made in {producingCountry}</p>
              )}
            </li>
          </ul>
        </article>
      </section>
      <VisitedProducts />
    </>
  );
};

Product.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  productStore: PropTypes.instanceOf(Object).isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
  toggleCurrentPreviewItem: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { productStore: state.product };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
    toggleCurrentPreviewItem: (item) =>
      dispatch(toggleCurrentPreviewItemHandler(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
