import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./SlideShow.scss";

/* eslint-disable react/jsx-boolean-value */

const SlideShow = ({ photo, alt }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="photo-block">
      <Carousel
        className="carou"
        responsive={responsive}
        ssr={true}
        transitionDuration={2}
        swipeable={true}
      >
        {photo.map((path) => (
          <div className="photo_wrapper" key={path}>
            <img src={path} alt={alt} className="photo" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

SlideShow.propTypes = {
  photo: PropTypes.instanceOf(Array).isRequired,
  alt: PropTypes.string.isRequired,
};

export default SlideShow;
