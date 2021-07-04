import React from "react";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";

const CartForm = ({id, colors, sizes}) => (
    <Formik initialValues={{ color: sizes[0], size: colors[0]}}
        onSubmit={values => console.log(values)}>
        {({values, handleSubmit}) => (
            <form onSubmit={handleSubmit}>
                <span>Select a color</span>
                    { colors.map((color, index) => <label htmlFor={`${color}${index}`} key={color}>
                        <Field id={`${color}${index}`} name="color" type="radio" />
                        {color}
                      </label>)}
                <span>Select a size</span>
                    <Field name="size" as="select">
                        { sizes.map((size, index) => index === 0 ?
                            <option key={size} value={size} selected>{size}</option>
                            : <option key={size} value={size}>{size}</option>)}
                    </Field>
                <button type="submit">Add to cart</button>
            </form>
        )}
    </Formik>
)

CartForm.defaultProps = { sizes: "", colors: "" }

CartForm.propTypes = {
    id: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
    sizes: PropTypes.arrayOf(PropTypes.string),
}

export default  CartForm;