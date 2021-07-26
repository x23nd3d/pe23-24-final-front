import React, { useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import colorize from "../../../utils/colorize";
import "./AddToCartForm.scss";
import { addToCart } from "../../../store/actions/cart";
import AddToCartButton from "./AddToCartButton";
import BackShopping from "../../UI/Buttons List/BackShopping";
import AddToWishList from "../../UI/Buttons List/AddToWishList";

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */

const AddToCartForm = ({ data, store, dispatchCart, product }) => {
  const { productStore, dispatchColor } = store;

  const handleColorState = useCallback(
    ({ color }) => {
      dispatchColor(color);
    },
    [dispatchColor]
  );

  const addToCartHandler = (dataItem, changedDetails) => {
    const color = changedDetails?.color
      ? changedDetails.color
      : dataItem.color[0];
    let size = null;
    if (changedDetails.size !== "undefined") {
      console.log("changedDetails.size.length", changedDetails.size);
      size = changedDetails.size;
    } else if (dataItem.size[0] !== undefined) {
      console.log("ataItem.size[0].length", dataItem.size[0].length);
      // eslint-disable-next-line prefer-destructuring
      size = dataItem.size[0];
    } else {
      size = [];
    }
    console.log("DIZE", size);

    const item = {
      ...dataItem,
      color,
      size,
    };

    dispatchCart(item);
  };

  return (
    <Formik
      initialValues={{
        id: data.id,
        color: productStore.color,
        size: `${data.size ? data.size[0] : []}`,
      }}
      onSubmit={(values) => addToCartHandler(product.currentItem, values)}
    >
      {({ values, handleSubmit }) => (
        <Form className="form" onSubmit={handleSubmit}>
          <div className="formBlockColor">
            <span className="dataPointer color-pointer">
              {data.color.length > 1 ? (
                "Select a color"
              ) : (
                <div className="formOneColorBlock">
                  <p>Color</p>
                  <span>
                    {productStore.color}
                  </span>
                </div>
              )}
            </span>
          </div>
            {data.color.length > 1 &&
            <div className="color-selection">
              {data.color.length > 1 &&
                data.color.map((color, index) => (
                  <div className="color-box" key={color}>
                    <Field
                      type="radio"
                      name="color"
                      id={`${color}${index}`}
                      value={color}
                      className="defaultRadio"
                      onClick={handleColorState(values)}
                    />
                    <label className="customRadio" htmlFor={`${color}${index}`}>
                      <span className={`${colorize(color)} customRadio`}>
                        <p className="colorName">{color}</p>
                      </span>
                    </label>
                  </div>
                ))}
            </div>}
          {Array.isArray(data.size) && data.size.length ? (
            <div className="formBlockSize">
              <span className="dataPointer">Select a size</span>
              <Field className="size-select" name="size" as="select">
                {data.size.map((size) => (
                  <option key={size} value={size} className="size-option">
                    {size}
                  </option>
                ))}
              </Field>
            </div>
          ) : null}
          <div className="formBlockSubmit">
            <BackShopping />
            <AddToCartButton />
            <AddToWishList />
          </div>
        </Form>)}
    </Formik>
  );
};

AddToCartForm.defaultProps = {
  dispatchColor: (f) => f,
  dispatchCart: (f) => f,
};

AddToCartForm.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  store: PropTypes.instanceOf(Object).isRequired,
  dispatchColor: PropTypes.func,
  dispatchCart: PropTypes.func,
  product: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return { product: state.product };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchCart: (item) => dispatch(addToCart(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartForm);
