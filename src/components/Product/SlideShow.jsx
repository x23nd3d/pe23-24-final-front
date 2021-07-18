import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./SlideShow.scss";

const SlideShow = ({ photos }) => {
  const [...photo] = Object.entries(photos);

  // console.log(photos);

  // const view = useContext(ProductViewContext);

  // const [currentPhotos, setCurrentPhotos] = useState(view);
  // const [currentColor, setCurrentColor] = useState(view);

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
      <Carousel className="carou" responsive={responsive}>
        {photo[0].map((path, index) => (
          <div key={path}>
            <div className="photo" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

SlideShow.propTypes = {
  photos: PropTypes.instanceOf(Object).isRequired,
};

export default SlideShow;
