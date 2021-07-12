import React, { useState }from "react";
import classNames from "classnames";
import classes from "./Search.module.scss";
import Button from "../../../UI/Buttons List/Button";
import {ReactComponent as CloseSearchIcon} from "./Search img/search-close.svg";
import {ReactComponent as SearchIcon} from "./Search img/magnifier.svg";


const Search = (props) => {
    const [isShowSearchField, setShowSearchField] = useState(false);

    return (
        <div>
            <div tabIndex={0} onKeyDown={setShowSearchField}  role="button" onClick={() => setShowSearchField(!isShowSearchField)} className={classes.SearchItem}>
                <SearchIcon />
                <span>Search</span>
            </div>
            {isShowSearchField &&
            <div tabIndex={0} onKeyDown={setShowSearchField}  role="button" className={classes.Search} onClick={() => setShowSearchField(false)} >
                <div tabIndex={0} onKeyDown={setShowSearchField}  role="button" className={classes.InputFieldPosition}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                >
                    <input
                        type="text"
                        size="50"
                        placeholder="Search for item"
                        className={classes.InputField}
                    />
                    <CloseSearchIcon className={classes.CloseSearch} onClick={() => setShowSearchField(false)}/>
                </div>
                <div className={classes.SearchBtn}>
                    <Button
                    label="SEARCH"
                    />
                </div>
            </div>
            }
        </div>
    )
}
export default Search;