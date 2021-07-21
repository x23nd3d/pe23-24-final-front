import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {colorAction, photoAction, visitedProductsAction } from "../../store/actions/product";
import { initialState } from "../../store/reducers/productReducer";
import Product from "./Product";

const ProductContainer = ({
  data,
  product,
  dispatchColor,
  dispatchPhoto,
  dispatchVisitedProducts,
}) => {
  const {color, photo} = data;
  const store = {product, dispatchColor, dispatchPhoto};

  console.log(initialState.color);

  product.color === initialState.color && dispatchColor(color[0]);
  product.color === initialState.photo && dispatchPhoto(photo[product.color]);
  dispatchVisitedProducts(data);
  // useEffect(() => {
  // }, [product.photo, product.color]);


  return <Product data={data} store={store} />
}

ProductContainer.defaultProps = {
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

ProductContainer.propTypes = {
  data: PropTypes.instanceOf(Object),
  product: PropTypes.PropTypes.instanceOf(Object).isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
  dispatchVisitedProducts: PropTypes.func.isRequired,
}

function mapStateToProps (state) {
  return { product: state.product }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
    dispatchVisitedProducts: (value) => dispatch(visitedProductsAction(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);