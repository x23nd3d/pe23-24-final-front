import React from "react";
import PropTypes from "prop-types";
import classes from "./AddNewAddressItem.module.scss";
import Modal from "../../../UI/Modal/Modal";
import Verification from "../../../Checkout/Verification/Verification";
import Checkout from "../../../Checkout/Checkout";

const AddNewAddressItem = ({modalContent, setModalContent}) => (
  <>
  {modalContent === "AddNewAddress" &&
  <Modal functionClose={() => setModalContent(null)}>
   <Verification />
  </Modal>}

  {modalContent === "AddNewCard" &&
  <Modal functionClose={() => setModalContent(null)}>
      <Checkout />
  </Modal>}
  </>
);

AddNewAddressItem.defaultProps = {
  modalContent: "",
  setModalContent: () => {},
};

AddNewAddressItem.propTypes = {
  modalContent: PropTypes.string,
  setModalContent: PropTypes.func
};

export default AddNewAddressItem ;
