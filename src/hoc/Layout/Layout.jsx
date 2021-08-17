import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { withRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Layout.module.scss";
import CartPreview from "../../components/Cart/CartPreview/CartPreview";
import { toggleCartPreviewHandler } from "../../store/actions/cart";
import {
  allowBodyScrolling,
  preventBodyScrolling,
} from "../../utils/bodyStyling";
import ErrorFallback from "../../components/Errors/ErrorFallback/ErrorFallback";

const Layout = ({
  children,
  auth,
  cartPreviewActive,
  cart,
  user,
  disableCartPreview,
}) => {
  useEffect(() => {
    disableCartPreview();
  }, [disableCartPreview]);

  useEffect(() => {
    cartPreviewActive ? preventBodyScrolling() : allowBodyScrolling();
  }, [cartPreviewActive]);

  return (
    <div className={classes.Layout}>
      {auth.loading || user.loading ? (
        <Spinner />
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {cartPreviewActive ? <CartPreview items={cart.items} /> : null}
            <ErrorBoundary FallbackComponent={ErrorFallback} >
              <Header />
              {children}
              <Footer />
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

Layout.defaultProps = {
  auth: {},
  cartPreviewActive: false,
  cart: {},
  user: {},
  disableCartPreview: (f) => f,
};

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
  cartPreviewActive: PropTypes.bool,
  cart: PropTypes.instanceOf(Object),
  disableCartPreview: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.auth,
    cartPreviewActive: state.cart.isPreviewActive,
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    disableCartPreview: () => dispatch(toggleCartPreviewHandler()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
