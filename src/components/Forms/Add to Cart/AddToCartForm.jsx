import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import colorize from "../../../utils/colorize";
import "./AddToCartForm.scss";
import { addToCart } from "../../../store/actions/cart";

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */

const AddToCartForm = ({
    data,
    store,
    dispatchCart,
    product, }) => {
    const {productStore, dispatchColor} = store;

    function handleColorState ({color}) {
        dispatchColor(color);
    }

    const addToCartHandler = (info, changedDetails) => {
        const color = changedDetails?.color ? changedDetails.color : info.color[0];
        const size = changedDetails?.size ? changedDetails.size : info.size[0];

        const item = {
            ...info,
            color,
            size,
        };
        dispatchCart(item);
    };

    return (
      <Formik
        initialValues={{ id: data.id, color: productStore.color, size: `${data.size ? data.size[0] : ""}`}}
        onSubmit={(values) => addToCartHandler(product, values)}
      >
          {({
              values,
              handleSubmit,
          }) => <Form className="form" onSubmit={handleSubmit}>
              <div className="formBlock">
                <span className="dataPointer">
                {data.color.length > 1 ? "Select a color" : <>Color<span style={{paddingLeft: "20px"}} >{productStore.color}</span></> }
                </span>
                  {data.color.length > 1 && data.color.map((color, index) => <div key={color}>
                        <Field
                          type="radio"
                          name="color"
                          id={`${color}${index}`}
                          value={color}
                          className="defaultRadio"
                          onClick={handleColorState(values)}
                        />
                        <label className="customRadio" htmlFor={`${color}${index}`}>
                            <span className={`${colorize(color)} customRadio`}>{color}</span>
                        </label>
                    </div>
                  )}
              </div>
              {data.size &&
              <div className="formBlock select-block">
                  <span className="dataPointer">Select a size</span>
                  <Field className="size-select" name="size" as="select">
                      {data.size.map(size => <option
                        key={size}
                        value={size}
                        className="size-option"
                      >{size}</option>)}
                  </Field>
              </div>}
              <button className="submit" type="submit">Add to Cart</button>
          </Form>
    }
    </Formik>
    )
}

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
}

function mapStateToProps(state) {
    return { product: state.product }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchCart: (item) => dispatch(addToCart(item)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartForm);