import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, useFormikContext } from "formik";
import colorize from "../../../utils/colorize";
import "./AddToCartForm.scss";

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
{/* eslint-disable jsx-a11y/no-static-element-interactions */}
{/* eslint-disable react/jsx-props-no-spreading */}



const AddToCartForm = ({id, colors, sizes}) => {

    const [currentColor, setCurrentColor] = useState(colors[0]);
    const [view, setView] = useState(colors[0]);


    const handleColor = (values) => setCurrentColor(values.color);

    useEffect(() => {
        setView(currentColor);
    }, [currentColor]);

    return (
    <Formik
        initialValues={{ color: colors[0], size: sizes[0], id}}
        onSubmit={(values) => console.log(values)}
        >
        {({
            values,
            handleSubmit,
        }) => <Form className="form" onSubmit={handleSubmit}>
                <div className="formBlock">
                <span className="dataPointer">
                {colors.length > 1 ? "Select a color" : <>Color<span style={{paddingLeft: "20px"}} >{colors[0]}</span></> }
                </span>
                {colors.length > 1 && colors.map((color, index) => <div key={color}>
                    <Field
                        type="radio"
                        name="color"
                        id={`${color}${index}`}
                        value={color}
                        className="defaultRadio"
                        onClickCapture={handleColor(values)}
                    />
                    <label className="customRadio" htmlFor={`${color}${index}`}>
                        <span className={`${colorize(color)} customRadio`}>{color}</span>
                    </label>
                    </div>
                )}
            </div>
            <div className="formBlock select-block">
                <span className="dataPointer">Select a size</span>
                <Field className="size-select" name="size" as="select">
                    {sizes.map(size => <option
                        key={size}
                        value={size}
                        className="size-option"
                    >{size}</option>)}
                </Field>
            </div>
            <button className="submit" type="submit">Add to Cart</button>
        </Form>
    }
    </Formik>
    )
}

AddToCartForm.propTypes = {
    id: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default AddToCartForm;