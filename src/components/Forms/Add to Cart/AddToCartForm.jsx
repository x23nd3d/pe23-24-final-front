import React, { useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import colorize from "../../../utils/colorize";
import classes from "./AddToCartForm.module.scss";
import { addToCart } from "../../../store/actions/cart";
import AddToCartButton from "./AddToCartButton";
import BackShopping from "../../UI/Buttons List/BackShopping";
import AddToWishList from "../../UI/Buttons List/AddToWishList";
import { toggleWishListHandler } from "../../../store/actions/user";

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */

const AddToCartForm = ({
  data,
  store,
  dispatchCart,
  product,
  user,
  auth,
  history,
  toggleWishList,
}) => {
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
      size = changedDetails.size;
    } else if (dataItem.size[0] !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      size = dataItem.size[0];
    } else {
      size = [];
    }

    const item = {
      ...dataItem,
      color,
      size,
    };

    dispatchCart(item);
  };

  const renderWishListCondition = () => {
    if (auth.token) {
      const transformedObjectTemp2 = {
        ...product.currentItem,
        color: product.currentItem.color[0],
        size: product.currentItem.size[0],
      };
      if (user.userId.wishlist.length > 0) {
        const wishIdx = user.userId.wishlist.find(
          (current) =>
            JSON.stringify(current) === JSON.stringify(product.currentItem)
        );

        if (wishIdx) {
          // TODO: Instead of this test object we should pass the exact params of color or size like as shop.currentPreviewItems
          const transformedObjectTemp = {
            ...wishIdx,
            color: wishIdx.color[0],
            size: wishIdx.size[0],
          };
          return (
            <AddToWishList
              item={transformedObjectTemp}
              isAdded="true"
              isAuth="true"
              history={history}
              toggle={toggleWishList}
            />
          );
        }
        return (
          <AddToWishList
            item={transformedObjectTemp2}
            isAdded="true"
            isAuth="true"
            history={history}
            toggle={toggleWishList}
          />
        );
      }
      return (
        <AddToWishList
          item={transformedObjectTemp2}
          isAdded="true"
          isAuth="true"
          history={history}
          toggle={toggleWishList}
        />
      );
    }
    return (
      <AddToWishList
        item={{}}
        isAdded={false}
        isAuth={false}
        toggle={(f) => f}
        history={history}
      />
    );
  };

  return (
    <Formik
      data-testid="AddToCartFormTestId"
      initialValues={{
        id: data.id,
        color: productStore.color,
        size: `${data.size ? data.size[0] : []}`,
      }}
      onSubmit={(values) => addToCartHandler(product.currentItem, values)}
    >
      {({ values, handleSubmit }) => (
        <Form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.formBlockColor}>
            <span className={classes.dataPointer}>
              {data.color.length > 1 ? (
                "Select a color"
              ) : (
                <div className={classes.formOneColorBlock}>
                  <p>Color</p>
                  <span>{productStore.color}</span>
                </div>
              )}
            </span>
            {data.color.length > 1 && (
              <div className={classes.colorSelection}>
                {data.color.length > 1 &&
                  data.color.map((color, index) => (
                    <div className={classes.colorBox} key={color}>
                      <Field
                        type="radio"
                        name="color"
                        id={`${color}${index}`}
                        value={color}
                        className={classes.defaultRadio}
                        onClick={handleColorState(values)}
                      />
                      <label
                        className={classes.customRadio}
                        htmlFor={`${color}${index}`}
                      >
                        <span
                          className={classNames(
                            classes[colorize(color)],
                            classes.customRadio
                          )}
                        >
                          <p className={classes.colorName}>{color}</p>
                        </span>
                      </label>
                    </div>
                  ))}
              </div>
            )}
          </div>
          {Array.isArray(data.size) && data.size.length ? (
            <div className={classes.formBlockSize}>
              <span className={classes.dataPointer}>Select a size</span>
              <Field className={classes.sizeSelect} name="size" as="select">
                {data.size.map((size) => (
                  <option
                    key={size}
                    value={size}
                    className={classes.sizeOption}
                  >
                    {size}
                  </option>
                ))}
              </Field>
            </div>
          ) : null}
          <div className={classes.formBlockSubmit}>
            <BackShopping history={history} />
            <AddToCartButton />
            {renderWishListCondition()}
          </div>
        </Form>
      )}
    </Formik>
  );
};

AddToCartForm.defaultProps = {
  dispatchColor: (f) => f,
  dispatchCart: (f) => f,
  toggleWishList: (f) => f,
  dispatchCart: (f) => f,
  toggleWishList: (f) => f,
};

AddToCartForm.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  store: PropTypes.instanceOf(Object).isRequired,
  dispatchColor: PropTypes.func,
  dispatchCart: PropTypes.func,
  toggleWishList: PropTypes.func,
  product: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    product: state.product,
    user: state.user,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchCart: (item) => dispatch(addToCart(item)),
    toggleWishList: (item) => dispatch(toggleWishListHandler(item)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddToCartForm));
