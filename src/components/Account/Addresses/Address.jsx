import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import classes from "./Address.module.scss";
import {
  deleteAddressBookHandler,
  sendAddressRequestChange,
  sendCardRequestChange,
  toggleAddressModalPreview,
} from "../../../store/actions/user";
import AddNewAddressItem from "./AddNewAddressItem/AddNewAddressItem";

const Address = ({
  user,
  deleteAddressBook,
  toggleAddressModal,
  sendCardRequest,
  sendAddressRequest,
}) => {
  const renderDeliveryAddresses = () =>
    user.userId.savedDeliveryMethods.map((address) => (
      <div
        key={address.deliveryMethod + Math.random() * 4}
        className={classes.ItemsWrapper}
      >
        <div className={classnames(classes.Inner, classes.InnerCard)}>
          <span>
            <span className={classes.AddressBold}>Delivery by:</span>
            {address.deliveryMethod[0].toUpperCase() +
              address.deliveryMethod.slice(1)}
          </span>{" "}
          <span>
            {address.deliveryAddress ? (
              <>
                <span className={classes.AddressBold}>Address:</span>
                {address.deliveryAddress}
              </>
            ) : (
              <>
                <span className={classes.AddressBold}>Address:</span>Store
              </>
            )}
          </span>
        </div>
        <button
          type="button"
          className={classes.DeleteAddressItem}
          onClick={() => deleteAddressBook(address.deliveryAddress)}
        >
          Delete
        </button>
      </div>
    ));

  const renderSavedCards = () =>
    user.userId.creditCards.map((card) => (
      <div
        key={card.cardNumber + card.cardName}
        className={classes.ItemsWrapper}
      >
        <div className={classnames(classes.Inner, classes.InnerCard)}>
          <span>
            <span className={classes.AddressBold}>Card Number:</span>
            {card.cardNumber}
          </span>{" "}
          <span>
            <span className={classes.AddressBold}>Card Name:</span>
            {card.cardName}
          </span>
          <p className={classes.SecurityCard}>
            Date and CVV code is not shown due to the security purposes.
          </p>
        </div>
        <button
          type="button"
          className={classes.DeleteAddressItem}
          onClick={() => deleteAddressBook(card)}
        >
          Delete
        </button>
      </div>
    ));

  return (
    <div className={classes.AddressBook}>
      <div className={classes.AddressBookDelivery}>
        <h3 className={classes.AddressBookTitle}>Address Book</h3>
        <div className={classes.AddressContainer}>
          {renderDeliveryAddresses()}
        </div>
        {user.userId.savedDeliveryMethods.length >= 3 ? (
          <p className={classes.LimitAddresses}>
            Address limit exceeded, please delete some of the saved addresses.
          </p>
        ) : (
          <button
            onClick={() => toggleAddressModal("AddNewAddress")}
            className={classes.Button}
            type="button"
          >
            Add New Address
          </button>
        )}
      </div>
      <div className={classes.AddressBookBilling}>
        <h3 className={classes.AddressBookTitle}>Credit Cards</h3>
        <div className={classes.AddressContainer}>{renderSavedCards()}</div>
        {user.userId.creditCards.length >= 3 ? (
          <p className={classes.LimitAddresses}>
            Credit cards limit exceeded, please delete some of the saved cards.
          </p>
        ) : (
          <button
            onClick={() => toggleAddressModal("AddNewCard")}
            className={classes.Button}
            type="button"
          >
            Add New Card
          </button>
        )}
      </div>
      {user.isModalActive && (
        <AddNewAddressItem
          setModalContent={toggleAddressModal}
          modalContent={user.isModalActive}
          sendAddressRequest={sendAddressRequest}
          sendCardRequest={sendCardRequest}
        />
      )}
    </div>
  );
};

Address.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  deleteAddressBook: PropTypes.func.isRequired,
  toggleAddressModal: PropTypes.func.isRequired,
  sendCardRequest: PropTypes.func.isRequired,
  sendAddressRequest: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAddressBook: (value) => dispatch(deleteAddressBookHandler(value)),
    toggleAddressModal: (bool) => dispatch(toggleAddressModalPreview(bool)),
    sendCardRequest: (obj) => dispatch(sendCardRequestChange(obj)),
    sendAddressRequest: (obj) => dispatch(sendAddressRequestChange(obj)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);
