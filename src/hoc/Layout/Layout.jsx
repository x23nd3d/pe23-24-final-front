import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Layout.module.scss";

const Layout = ({ children, auth }) => (
  <div className={classes.Layout}>
    {auth.loading ? (
      <Spinner />
    ) : (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header />
          {children}
          <Footer />
        </motion.div>
      </AnimatePresence>
    )}
  </div>
);

Layout.defaultProps = {
  auth: {},
};

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(withRouter(Layout));
