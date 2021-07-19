import React, {useEffect} from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import classNames from "classnames";
import AddToCartForm from "../Forms/Add to Cart/AddToCartForm";
// import {colorAction} from "../../store/actions/product";
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
    dataBlock
} from "./Product.module.scss";

const Product = ({data, store}) => {
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
        producingCountry
    } = data;

    return (
        <section className={product}>
            <SlideShow photo={store.product.photo} />
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
        photo: PropTypes.instanceOf(Object),
        producingCountry: PropTypes.string,
        color: PropTypes.arrayOf(PropTypes.string),
        size: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.instanceOf(Array)
    }).isRequired,
    store: PropTypes.shape({
        product: PropTypes.instanceOf(Object),
        dispatchColor: PropTypes.func,
        dispatchPhoto: PropTypes.func
    }).isRequired
}

export default Product;