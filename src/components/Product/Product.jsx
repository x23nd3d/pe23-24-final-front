import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CartForm from "../Forms/CartForm";
import {product} from "./Product.module.scss";

const Product = ({data}) => {
    const {
        id, name, caption, material, type, color, size, price, description, producingCountry
    } = data;

    return (
        <section className={product}>
            <article>
                <ul>
                    <li>
                        <p>{name}</p>
                        <p>{caption}</p>
                    </li>
                    <li>
                        <span>Price</span>
                        <p>{`$${price}`}</p>
                    </li>
                    <li>
                        <span>Type</span>
                        <p>{type}</p>
                    </li>
                    <li>
                        <span>Material</span>
                        <p>{material}</p>
                    </li>
                    <li>
                        <ul>
                        {description.map((point) => (
                            <li key={`${point.slice(-3)}${Math.random() * 50}${point.slice(0, 5)}`}>{point}</li>
                        ))}
                        </ul>
                    </li>
                    {producingCountry && <li>Made in {producingCountry}</li> }
                </ul>
                <CartForm id={id} colors={color} sizes={size} />
            </article>
        </section>
    )
}

Product.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        caption: PropTypes.string,
        type: PropTypes.string,
        material: PropTypes.string,
        price: PropTypes.string,
        producingCountry: PropTypes.string,
        color: PropTypes.arrayOf(PropTypes.string),
        size: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
}
export default Product;