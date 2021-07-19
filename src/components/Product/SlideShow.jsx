import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Carousel from "react-multi-carousel";
import { colorAction } from "../../store/actions/product";
import "react-multi-carousel/lib/styles.css";
import "./SlideShow.scss";
import pic from "./canali_black1.png";

/* eslint-disable react/jsx-boolean-value */

const SlideShow = ({photoState}) => {

  // const [...photo] = Object.entries(photos);
  // console.log(photo);
  // photo.forEach(p => console.log(p[1][0]))

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
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
          {photoState.photo.map((path, index) => <div className="photo_wrapper" key={path} >
              <img src={pic} className="photo" />
            </div>)}
        </Carousel>
    </div>
  )
}


// SlideShow.defaultProps = {
//   dispatchPhoto: (f) => f,
// };

SlideShow.propTypes = {
  // photos: PropTypes.instanceOf(Object).isRequired,
  // productState: PropTypes.instanceOf(Array).isRequired
    // PropTypes.instanceOf(Object)
// ]).isRequired,
photoState: PropTypes.instanceOf(Array).isRequired,
}

function mapStateToProps (state) {
  return {
    photoState: state.photo,
    // productState: state.product
  }
}

// function mapDispatchToProps (dispatch) {
//   return { dispatchPhoto: (value) => dispatch(colorAction(value)) }
// }

export default connect(mapStateToProps)(SlideShow);