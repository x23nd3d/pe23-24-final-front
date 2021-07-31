import React, { useState, useCallback } from "react";
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
            NEW COLLECTION
            <div className={classes.ShopBtn}>
              <button type="button" className={classes.ShopNewBtn}>
                SHOP NOW
              </button>
            </div>
          </div>
          <img src={slideOne} alt="Slide 1" />
        </div>
        <div className={classes.Slid}>
          <div className={classes.TextSale}>
            END-OF-SEASON SALE
            <div className={classes.ShopBtn}>
              <button type="button" className={classes.ShopNowBtn}>
                SHOP NOW
              </button>
            </div>
          </div>
          <img src={slideTow} alt="Slide 2" />
        </div>
        <div className={classes.Slid}>
          <div className={classes.TextEngoy}>
            ENJOY <span className={classes.Off}>70% OFF</span>
            <button type="button" className={classes.ShopEnjoyBtn}>
              SHOP NOW
            </button>
          </div>
          <img src={slideThree} alt="Slide 3" />
        </div>
      </AliceCarousel>
    </div>
  );
};

export default Slider;
