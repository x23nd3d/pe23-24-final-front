import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import colorize from "../../../utils/colorize";
import "./AddToCartForm.scss";

const AddToCartForm = ({id, colors, sizes}) => (
    <Formik
        initialValues={{ color: colors[0], size: sizes[0] }}
        onSubmit={(values) => console.log(values)}>
        {({
            values,
            handleSubmit
        }) => <Form className="form" onSubmit={handleSubmit}>
            <div className="formBlock">
                <span className="dataPointer">
                {colors.length > 1 ? "Select a color" : <>Color<span style={{paddingLeft: "20px"}} >{colors[0]}</span></> }
                </span>
                {colors.length > 1 && colors.map((color, index) => <label key={color} htmlFor={`${color}${index}`}>
                    <Field
                        type="radio"
                        name="color"
                        id={`${color}${index}`}
                        value={color}
                        className="defaultRadio"
                    />
                    <span className={`${colorize(color)} customRadio`}>{color}</span>
                </label>)}
            </div>
            <div className="formBlock select-block">
                <span className="dataPointer">Select a size</span>
                <Field className="size-select" name="size" as="select">
                    {sizes.map(size => <option
                        key={size}
                        value={size}
                        className="size-option"
                    >
                        {size}
                    </option>)}
                </Field>
            </div>
            <button className="submit" type="submit">Add to Cart</button>
        </Form>
    }
    </Formik>
)

AddToCartForm.propTypes = {
    id: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default AddToCartForm;