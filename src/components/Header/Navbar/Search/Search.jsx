import React, { useState } from "react";
import classes from "./Search.module.scss";
import Button from "../../../UI/Buttons List/Button";
import { ReactComponent as CloseSearchIcon } from "./Search img/search-close.svg";

const Search = (props) => {
  const [isShowSearchField, setShowSearchField] = useState(false);

  return (
    <div>
      <div
        tabIndex={0}
        onKeyDown={setShowSearchField}
        role="button"
        onClick={() => setShowSearchField(!isShowSearchField)}
      >
        Search
      </div>
      {isShowSearchField && (
        <div className={classes.Search}>
          <div className={classes.InputFieldPosition}>
            <input
              type="text"
              size="50"
              placeholder="Search for item"
              className={classes.InputField}
            />
            <CloseSearchIcon className={classes.CloseSearch} />
          </div>
          <div className={classes.SearchBtn}>
            <Button label="SEARCH" />
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
