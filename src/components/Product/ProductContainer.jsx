import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {colorAction, photoAction } from "../../store/actions/product";
import { initialState } from "../../store/reducers/productReducer";
import Product from "./Product";

const ProductContainer = ({data, product, dispatchColor, dispatchPhoto}) => {
  const {color, photo} = data;
  const store = {product, dispatchColor, dispatchPhoto};

  useEffect(() => {
      product.color === initialState.color && dispatchColor(color[0]);
      dispatchPhoto(photo[product.color]);
  }, [product.photo, product.color]);

  return (
    <Product data={data} store={store} />
  )
}

ProductContainer.propTypes = {
  data: PropTypes.shape({
      photo: PropTypes.instanceOf(Object),
      color: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  product: PropTypes.PropTypes.instanceOf(Object).isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return { product: state.product }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);