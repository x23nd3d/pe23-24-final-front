import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./SlideShow.scss";
import Title from "../UI/Section Title/Title";
import ProductCard from "../Shop/Exposition/ProductCard";

/* eslint-disable react/jsx-boolean-value */

const VisitedProducts = ({data}) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 980, min: 0 },
      items: 2
    }
  };

  return (
    <section className="visited-block">
      <Title text="Visited Items" />
        <Carousel
          className="slides"
          responsive={responsive}
          ssr={true}
          transitionDuration={2}
          swipeable={true}
        >
        { data.map(card => <ProductCard product={card} key={card.id} />) }
        </Carousel>
    </section>
  )
}

VisitedProducts.defaultProps = {
  data: {
    id: "1701",
    name: "Canali",
    viewImage: "https://cdn.discordapp.com/attachments/658409407230640143/866799292298297364/1701_navy_canali1.png",
    price: "2099",
  }
}

VisitedProducts.propTypes = {
  data: PropTypes.instanceOf(Array)
}

export default VisitedProducts;