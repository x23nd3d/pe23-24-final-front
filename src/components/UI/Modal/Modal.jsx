import React from "react";
import PropTypes from "prop-types";
import classes from "./Modal.module.scss";

const Modal = (props) => {
  const { functionClose, children } = props;
  return (
    <div
      tabIndex={0}
      onKeyDown={functionClose}
      role="button"
      className={classes.Modal}
      onClick={functionClose}
    >
      <div
        tabIndex={0}
        onKeyDown={(e) => e.stopPropagation()}
        role="button"
        className={classes.ModalInner}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.ModalContent}>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
Modal.propTypes = {
  functionClose: PropTypes.func,
  children: PropTypes.node,
};
Modal.defaultProps = {
  functionClose: () => {},
  children: "",
};
