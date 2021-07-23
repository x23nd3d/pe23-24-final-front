import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import AddToCartForm from "../Forms/Add to Cart/AddToCartForm";
import SlideShow from "./SlideShow";
import {colorAction, photoAction } from "../../store/actions/product";
import VisitedProducts from "./VisitedProducts";

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
      <section className={product}>
        <SlideShow
            photo={productStore.photo}
            alt={`${material}${category}`}
        />
        <article className={dataBlock}>
            <ul className={classNames(Details)}>
                <li className={primaryBlock}>
                    <header className={classNames(Title)}>
                        <h2 className={classNames(Name)}>{name}</h2>
                        <p className={classNames(Caption)}>{caption}</p>
                    </header>
                    <span className={classNames(dataPointer, Price)}>Price<p>{`$${price}`}</p></span>
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
                    {description.map((point) => <li
                        key={`${point.slice(-3)}${Math.random() * 50}${point.slice(0, 5)}`}>
                            {point}
                        </li>)}
                    </ul>
                {producingCountry && <p style={{margin: "10px 0"}}>Made in {producingCountry}</p> }
                </li>
              </ul>
        </article>
      </section>

    <VisitedProducts data={productStore.visited} />
  </>
  )
}


Product.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  productStore: PropTypes.PropTypes.instanceOf(Object).isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return { productStore: state.product };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
