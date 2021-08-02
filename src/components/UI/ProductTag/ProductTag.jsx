import React from "react";
import PropTypes from "prop-types";
import classes from "./ProductTag.module.scss";

const ProductTag = ({ item, tag }) => {
  const cls = [
    classes.productTag,
    item[tag] === true || tag === "popular" ? classes[tag] : null,
  ];

  return (
    <div data-testid="ProductTagTestId" className={cls.join(" ")}>
      {tag}
    </div>
  );
};

ProductTag.defaultProps = {
  item: {},
  tag: ""
}

ProductTag.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  tag: PropTypes.string.isRequired,
};

export default ProductTag;
