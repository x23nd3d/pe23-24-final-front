import React from "react";
import Title from "../../../UI/Section Title/Title";
import Clothes from "./Clothes";
import Shoes from "./Shoes";
import Accessories from "./Accessories";
import {categories} from "./Categories.module.scss";

const Categories = () => (
    <section className={categories}>
        <Title text="Shop by category" />
        <Clothes />
        <Shoes />
        <Accessories />
    </section>
);

export default Categories;