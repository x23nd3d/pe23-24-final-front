import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field, useFormikContext } from "formik";
import { colorAction } from "../../../store/actions/product";
import colorize from "../../../utils/colorize";
import CartPreview from "../../Cart/CartPreview/CartPreview";
import "./AddToCartForm.scss";
import { addToCart } from "../../../store/actions/cart";

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
{
  /* eslint-disable jsx-a11y/no-static-element-interactions */
}
{
  /* eslint-disable react/jsx-props-no-spreading */
}

const AddToCartForm = ({
  id,
  colors,
  sizes,
  productState,
  dispatchColor,
  dispatchCart,
  product,
}) => {
  function handleColorState({ color }) {
    dispatchColor(color);
  }

  const addToCartHandler = (data, changedDetails) => {
    const color = changedDetails?.color ? changedDetails.color : data.color[0];
    const size = changedDetails?.size ? changedDetails.size : data.size[0];

    const item = {
      ...data,
      color,
      size,
    };
    dispatchCart(item);
  };

  return (
    <Formik
      initialValues={{ color: colors[0], size: sizes[0], id }}
      onSubmit={(values) => addToCartHandler(product, values)}
    >
      {({ values, handleSubmit }) => (
        <Form className="form" onSubmit={handleSubmit}>
          <div className="formBlock">
            <span className="dataPointer">
              {colors.length > 1 ? (
                "Select a color"
              ) : (
                <>
                  Color<span style={{ paddingLeft: "20px" }}>{colors[0]}</span>
                </>
              )}
            </span>
            {colors.length > 1 &&
              colors.map((color, index) => (
                <div key={color}>
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
                      {color}
                    </span>
                  </label>
                </div>
              ))}
          </div>
          <div className="formBlock select-block">
            <span className="dataPointer">Select a size</span>
            <Field className="size-select" name="size" as="select">
              {sizes.map((size) => (
                <option key={size} value={size} className="size-option">
                  {size}
                </option>
              ))}
            </Field>
          </div>
          <button className="submit" type="submit">
            Add to Cart
          </button>
        </Form>
      )}
    </Formik>
  );
};

AddToCartForm.defaultProps = {
  dispatchColor: (f) => f,
  dispatchCart: (f) => f,
};

AddToCartForm.propTypes = {
  id: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  productState: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object),
  ]).isRequired,
  dispatchColor: PropTypes.func,
  dispatchCart: PropTypes.func,
  product: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return { productState: state.product };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchCart: (item) => dispatch(addToCart(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartForm);
