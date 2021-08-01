import React from "react";
import PropTypes from "prop-types";
import classes from "./Modal.module.scss";
import {ReactComponent as CloseIcon} from "../../../img/icons/close.svg";


const Modal = (props) => {
        const {functionClose, header, closeButton, children, footer} = props;
        return (
            
           <div tabIndex={0}
           onKeyDown={functionClose}
           role="button"
            className={classes.Modal}
            onClick={functionClose}
            >
                <div tabIndex={0}
                    onKeyDown={(e) => e.stopPropagation()}
                    role="button"
                    className={classes.ModalInner}
                    onClick={(e) => e.stopPropagation()}>

                    {/* <div className={classes.ModalHeader}>
                       {header}
                       {closeButton && <CloseIcon className={classes.CloseSvg} onClick={functionClose}/>}
                    </div> */}

                    <div className={classes.ModalContent}>
                        {children}
                    </div>

                    {/* <div className={classes.ModalFooter}>
                        {footer}
                    </div> */}
                </div>
            </div>

        )
    
}
export default Modal
Modal.propTypes = {
    functionClose: PropTypes.func,
    header: PropTypes.string,
    closeButton: PropTypes.func,
    children: PropTypes.node,
    footer: PropTypes.node
}
Modal.defaultProps = {
    functionClose: () => {},
    header: "",
    closeButton: () => {},
    children: "",
    footer: ""
}
