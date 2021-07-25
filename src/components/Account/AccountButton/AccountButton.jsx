import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classes from "./AccountButton.module.scss";

const AccountButton = ({ icon, title, description, route }) => (
  <Link className={classes.AccountButton} to={route}>
    <i className={icon} />
    <div className={classes.AccountButtonDetails}>
      <p> {title}</p>
      <p>{description}</p>
    </div>
  </Link>
);

AccountButton.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default AccountButton;
