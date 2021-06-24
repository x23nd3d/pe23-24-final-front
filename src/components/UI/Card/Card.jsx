import React from "react";
import PropTypes from "prop-types";
import classes from "./Card.module.scss";

const Card = ({ imgUrl, text, styles }) => (
  <div className={classes.Card} style={styles}>
    <img alt={text} src={imgUrl} />
    <div className={classes.Text}>{text}</div>
  </div>
);

Card.defaultProps = {
  imgUrl: "",
  text: "",
  styles: "",
};

Card.propTypes = {
  imgUrl: PropTypes.string,
  text: PropTypes.string,
  styles: PropTypes.string,
};

export default Card;
