import React from "react";
import Clothes from "./Clothes";
import Shoes from "./Shoes";
import Accessories from "./Accessories";

import "./styles/categories.scss";

const Categories = () => (
    <section className="categories">
        <header className="title">
            <p>Shop by category</p>
        </header>
        <Clothes />
        <Shoes />
        <Accessories />
    </section>
);

export default Categories;