import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Carousel from "react-multi-carousel";
import { colorAction } from "../../store/actions/product";
import "react-multi-carousel/lib/styles.css";
import "./SlideShow.scss";
import pic from "./canali_black1.png";

const SlideShow = ({photos, productState, dispatchPhoto}) => {

  const [...photo] = Object.entries(photos);
  // console.log(photo);
  photo.forEach(p => console.log(p[1][0]))

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
        <Carousel className="carou" responsive={responsive}>
          {photo.map((path, index) => <div className="photo_wrapper" key={path} >
              <img src={path} className="photo" />
            </div>)}
        </Carousel>
    </div>
  )
}


SlideShow.defaultProps = {
  dispatchPhoto: (f) => f,
};

SlideShow.propTypes = {
  photos: PropTypes.instanceOf(Object).isRequired,
  productState: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.instanceOf(Object)
]).isRequired,
dispatchPhoto: PropTypes.func
}

function mapStateToProps (state) {
  return { productState: state.product  }
}

function mapDispatchToProps (dispatch) {
  return { dispatchPhoto: (value) => dispatch(colorAction(value)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);