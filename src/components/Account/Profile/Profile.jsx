/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import classes from "./Profile.module.scss";

const Profile = (props) => {
  const [accountInfo, setAccountInfo] = useState({
    email: "",
    firstName: "",
    secondName: "",
    mobilePhone: "",
    birthday: "",
    clothesSize: "",
    shoesSize: "",
  });

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };
  return (
    <form className={classes.MyAccountForm}>
      <div className={classes.InputField}>
        <label htmlFor="InputEmail">Email</label>
        <input
          className={classes.Input}
          id="InputEmail"
          type="text"
          name="email"
          value={accountInfo.email}
          placeholder="Email address"
          onChange={(event) => handleOnChange(event)}
        />
      </div>
      <div className={classes.InputField}>
        <label htmlFor={classes.InputFirstName}>First name</label>
        <input
          className={classes.Input}
          id={classes.InputFirstName}
          type="text"
          name="firstName"
          value={accountInfo.firstName}
          placeholder="First name"
          onChange={(event) => handleOnChange(event)}
        />
      </div>
      <div className={classes.InputField}>
        <label htmlFor={classes.InputSecondName}>Second name</label>
        <input
          className={classes.Input}
          id={classes.InputSecondName}
          type="text"
          name="secondName"
          value={accountInfo.secondName}
          placeholder="Second name"
          onChange={(event) => handleOnChange(event)}
        />
      </div>
      <div className={classes.InputField}>
        <label htmlFor={classes.InputMobilePhone}>Mobile phone</label>
        <input
          className={classes.Input}
          id={classes.InputMobilePhone}
          type="phone"
          name="mobilePhone"
          value={accountInfo.mobilePhone}
          placeholder="Mobile phone"
          onChange={(event) => handleOnChange(event)}
        />
      </div>
      <div className={classes.InputField}>
        <label htmlFor={classes.InputDate}>Birthday</label>
        <input
          className={classes.Input}
          id={classes.InputDate}
          type="date"
          name="birthday"
          value={accountInfo.birthday}
          onChange={(event) => handleOnChange(event)}
        />
      </div>
      <div className={classes.InputField}>
        <label htmlFor={classes.InputClothesSize}>Your clothes size</label>
        <input
          className={classes.Input}
          id={classes.InputClothesSize}
          type="text"
          name="clothesSize"
          value={accountInfo.clothesSize}
          placeholder="Your clothes size"
          onChange={(event) => handleOnChange(event)}
        />
      </div>
      <div className={classes.InputField}>
        <label htmlFor={classes.InputShoesSize}>Your shoes size</label>
        <input
          className={classes.Input}
          id={classes.InputShoesSize}
          type="text"
          name="shoesSize"
          value={accountInfo.shoesSize}
          placeholder="Your shoes size"
          onChange={(event) => handleOnChange(event)}
        />
      </div>
      <button className={classes.Button} type="button">
        Save
      </button>
    </form>
  );
};

export default Profile;
