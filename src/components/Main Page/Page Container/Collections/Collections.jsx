import React from "react";
import { NavLink } from "react-router-dom";
import Title from "../../../UI/Section Title/Title";
import New from "./New";
import Recommended from "./Recommended";
import Popular from "./Popular";
import {collections} from "./Collections.module.scss";

const Collections = () => (
    <section className={collections}>
        <Title text="Collections" position />
        <NavLink to="/shop/collections/new" >
            <New />
        </NavLink>
        <NavLink to="/shop/collections/recommended" >
            <Recommended />
        </NavLink>
        <NavLink to="/shop/collections/popular" >
            <Popular />
        </NavLink>
    </section>
);

export default Collections;