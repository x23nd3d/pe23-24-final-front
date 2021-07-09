import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import classes from "./Layout.module.scss";

const Layout = ({ children }) => (
  <div className={classes.Layout}>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
