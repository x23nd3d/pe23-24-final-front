import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import {connect} from "react-redux";
import Carousel from "react-multi-carousel";
// import { colorAction } from "../../store/actions/product";
import "react-multi-carousel/lib/styles.css";
import "./SlideShow.scss";

/* eslint-disable react/jsx-boolean-value */

const SlideShow = ({photo}) => {

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
          {photo.map((path) => <div className="photo_wrapper" key={path} >
              <img src={path} className="photo" />
            </div>)}
        </Carousel>
    </div>
  )
}

// SlideShow.defaultProps = {
//   dispatchPhoto: (f) => f,
// };

SlideShow.propTypes = {
  photo: PropTypes.instanceOf(Array).isRequired,
  // productState: PropTypes.instanceOf(Array).isRequired
    // PropTypes.instanceOf(Object)
// ]).isRequired,
// photoState: PropTypes.instanceOf(Array).isRequired,
}

// function mapStateToProps (state) {
//   return {
//     photoState: state.photo,
//     // productState: state.product
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return { dispatchPhoto: (value) => dispatch(colorAction(value)) }
// }
export default SlideShow;
// export default connect(mapStateToProps)();