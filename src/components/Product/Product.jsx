import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AddToCartForm from "../Forms/Add to Cart/AddToCartForm";
import SlideShow from "./SlideShow";

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

const Product = ({ data }) => {
  const {
    id,
    name,
    caption,
    material,
    type,
    color,
    size,
    photo,
    price,
    description,
    producingCountry,
  } = data;

  return (
    <section className={product}>
      <SlideShow photos={photo} />
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
            <AddToCartForm id={id} colors={color} sizes={size} product={data} />
            <hr />
          </li>
          <li className={bottomBlock}>
            <h3 className={moreDetails}>More details</h3>
            <span className={dataPointer}>
              Type<p>{type}</p>
            </span>
            <span className={dataPointer}>
              Material<p>{material}</p>
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
            {producingCountry && <p>Made in {producingCountry}</p>}
          </li>
        </ul>
      </article>
    </section>
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    caption: PropTypes.string,
    type: PropTypes.string,
    material: PropTypes.string,
    price: PropTypes.string,
    photo: PropTypes.instanceOf(Object),
    producingCountry: PropTypes.string,
    color: PropTypes.arrayOf(PropTypes.string),
    size: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.instanceOf(Array),
  }).isRequired,
};
export default Product;
