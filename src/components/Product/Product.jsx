import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import AddToCartForm from "../Forms/Add to Cart/AddToCartForm";
import SlideShow from "./SlideShow";
import {
  colorAction,
  photoAction,
  visitedProductsAction,
} from "../../store/actions/product";
import Spinner from "../UI/Spinner/ShopSpinner/ShopSpinner";
import {
  product,
  Details,
  primaryBlock,
  selectionBlock,
  Title,
  Name,
  Caption,
  dataPointer,
  Price,
  moreDetails,
  bottomBlock,
  dsc,
  dataBlock,
} from "./Product.module.scss";

const Product = ({
  data,
  productStore,
  dispatchColor,
  dispatchPhoto,
  dispatchVisitedProducts,
}) => {
  const store = { productStore, dispatchColor };

  const {
    id,
    name,
    caption,
    category,
    material,
    type,
    color,
    size,
    photo,
    price,
    description,
    producingCountry,
  } = data;

  useEffect(() => {
    dispatchPhoto(photo[productStore.color]);
  }, [productStore.color]);

  return (
    <section className={product}>
      {productStore.loading ? (
        <Spinner />
      ) : (
        <SlideShow photo={productStore.photo} alt={`${material}${category}`} />
      )}

      <article className={dataBlock}>
        <ul className={classNames(Details)}>
          <li className={primaryBlock}>
            <header className={classNames(Title)}>
              <h2 className={classNames(Name)}>{name}</h2>
              <p className={classNames(Caption)}>{caption}</p>
            </header>
            <span className={classNames(dataPointer, Price)}>
              Price<p>{`$${price}`}</p>
            </span>
          </li>
          <li className={selectionBlock}>
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
  );
};

Product.propTypes = {
  data: PropTypes.instanceOf(Object),
  productStore: PropTypes.PropTypes.instanceOf(Object).isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
  dispatchVisitedProducts: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { productStore: state.product };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
    dispatchVisitedProducts: (value) => dispatch(visitedProductsAction(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
