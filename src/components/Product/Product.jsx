import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import AddToCartForm from "../Forms/Add to Cart/AddToCartForm";
import SlideShow from "./SlideShow";
import {colorAction, photoAction, visitedProductsAction } from "../../store/actions/product";

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

const Product = ({
  data,
  productStore,
  dispatchColor,
  dispatchPhoto,
  dispatchVisitedProducts
}) => {
  const store = {productStore, dispatchColor}

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
    producingCountry
} = data;

  useEffect(() => {
    dispatchPhoto(photo[productStore.color]);
  }, [productStore.color]);


  return (
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
  )
}

Product.defaultProps = {
  data: {
    id: "1701",
    name: "Canali",
    caption: "Siena Suit - Classic Fit",
    category: "Suit",
    type: "Classic",
    photo: {
      Navy: [
        "https://cdn.discordapp.com/attachments/658409407230640143/866799292298297364/1701_navy_canali1.png",
        "https://cdn.discordapp.com/attachments/658409407230640143/866799375908995092/1701_navy_canali2.png",
        "https://cdn.discordapp.com/attachments/658409407230640143/866799403309858857/1701_navy_canali3.png"
      ],
      Black: [
        "https://cdn.discordapp.com/attachments/658409407230640143/866799768612372520/1701_black_canali1.png",
        "https://cdn.discordapp.com/attachments/658409407230640143/866799795133481001/1701_black_canali2.png",
        "https://cdn.discordapp.com/attachments/658409407230640143/866799826041700352/1701_black_canali3.png"
      ],
      Charcoal: [
        "https://cdn.discordapp.com/attachments/658409407230640143/866800142588706886/1701_charcoal_canali1.png",
        "https://cdn.discordapp.com/attachments/658409407230640143/866800167164182548/1701_charcoal_canali2.png",
        "https://cdn.discordapp.com/attachments/658409407230640143/866800188726312990/1701_charcoal_canali3.png"
      ],
    },
    color: ["Navy", "Black", "Charcoal"],
    material: "Wool",
    price: "2099",
    size: ["38", "40", "42", "44", "48"],
    producingCountry: "Italy",
    description: [
      "Jacket: notch lapel, two-button front, chest pocket, flap hand pockets, non-functional four-button cuffs, double back vents",
      "Trousers: slide and two-button closure with zip fly, hand pockets, back button pockets, flat front, creased",
      "Family-run since 1934, Canali’s tailored designs are handcrafted with premium fabrics and a meticulous attention to detail.",
    ]
  }
}

Product.propTypes = {
  data: PropTypes.instanceOf(Object),
  productStore: PropTypes.PropTypes.instanceOf(Object).isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
  dispatchVisitedProducts: PropTypes.func.isRequired,
}

function mapStateToProps (state) {
  return { productStore: state.product }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
    dispatchVisitedProducts: (value) => dispatch(visitedProductsAction(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);