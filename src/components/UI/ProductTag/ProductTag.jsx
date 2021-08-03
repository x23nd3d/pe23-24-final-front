import React from "react";
import PropTypes from "prop-types";
import classes from "./ProductTag.module.scss";

import newArrival from "../../../img/ProductCard/new.svg";
import recommend from "../../../img/ProductCard/recommend.svg";
import notavailable from "../../../img/ProductCard/notavailable.svg";
import popular from "../../../img/ProductCard/popular.svg";

const ProductTag = ({ item, tag }) => {
  const cls = [
    classes.productTag,
    item[tag] === true || tag === "popular" ? classes[tag] : null,
    tag === "Not available" ? classes.notavailable : null,
  ];

  const renderTag = (tagName) => {
    let link = null;

    if (tagName.toLowerCase() === "new") link = newArrival;
    if (tagName.toLowerCase() === "recommended") link = recommend;
    if (tagName.toLowerCase() === "not available") link = notavailable;
    if (tagName.toLowerCase() === "popular") link = popular;

    return <img className={classes.Tag} src={link} alt={tagName} />;
  };

  return (
    <div data-testid="ProductTagTestId" className={cls.join(" ")}>
      {renderTag(tag)}
    </div>
  );
};

ProductTag.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  tag: PropTypes.string.isRequired,
};

export default ProductTag;
