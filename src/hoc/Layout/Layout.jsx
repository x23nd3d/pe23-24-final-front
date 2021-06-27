import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/Main Page/Header/Header";
import Slider from "../../components/Main Page/Slider/Slider";
import classes from "./Layout.module.scss";

const Layout = ({ children }) => (
  <div className={classes.Layout}>
    <Header />
    <Slider />
    {children}
  </div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
