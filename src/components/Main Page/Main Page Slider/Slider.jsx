import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "./_alice-carousel-customized.sass";
import slideOne from "../../../img/Slider/slider-image-1.jpg";
import slideTow from "../../../img/Slider/slider-image-2.jpg";
import slideThree from "../../../img/Slider/slider-image-3.jpg";
import classes from "./Slider.module.scss";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSlideChanged = useCallback((e) => setCurrentIndex(e.item), []);

  return (
    <div className={classes.Slider}>
      <AliceCarousel
        autoPlay
        autoPlayInterval={4000}
        buttonsDisabled
        infinite
        disableButtonsControls
        slideToIndex={currentIndex}
        onSlideChanged={onSlideChanged}
      >
        <div className={classes.Slid}>
          <div className={classes.TextNew}>
            NEW ARRIVALS
            <div className={classes.ShopBtn}>
              <Link
                to="/shop/?category=collections&type=new"
                className={classes.ShopNewBtn}>
                SHOP NOW
              </Link>
            </div>
          </div>
          <img src={slideOne} alt="Slide 1" />
        </div>
        <div className={classes.Slid}>
          <div className={classes.TextSale}>
          SEE OUR JACKETS
            <div className={classes.ShopBtn}>
              <Link
                to="/shop/?category=clothes&type=outerwear"
                className={classes.ShopNowBtn}>
                SHOP NOW
              </Link>
            </div>
          </div>
          <img src={slideTow} alt="Slide 2" />
        </div>
        <div className={classes.Slid}>
          <div className={classes.TextEngoy}>
           BEST ACCESSORIES
            <Link
                to="/shop/?category=accessories&type=all"
                className={classes.ShopEnjoyBtn}>
                <span>SHOP NOW</span>
            </Link>
          </div>
          <img src={slideThree} alt="Slide 3" />
        </div>
      </AliceCarousel>
    </div>
  );
};

export default Slider;
