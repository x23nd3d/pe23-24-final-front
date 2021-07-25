import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Title from "../../../UI/Section Title/Title";
import Clothes from "./Clothes";
import Shoes from "./Shoes";
import Accessories from "./Accessories";
import { categories } from "./Categories.module.scss";
import CollectionsRoutesContext from "../../../../context/CollectionsRoutes/CollectionsRoutesContext";

const Categories = () => {
  const { registerRoutesHandler } = useContext(CollectionsRoutesContext);
  return (
    <section className={categories}>
      <Title text="Shop by category" />
      <NavLink
        to="/shop/?category=clothes&type=all"
        onClick={() =>
          registerRoutesHandler(
            "/shop?category=clothes&type=all",
            "viewAll",
            "clothes"
          )
        }
      >
        <Clothes />
      </NavLink>
      <NavLink
        to="/shop/?category=shoes&type=all"
        onClick={() =>
          registerRoutesHandler(
            "/shop/?category=shoes&type=all",
            "viewAll",
            "shoes"
          )
        }
      >
        <Shoes />
      </NavLink>
      <NavLink
        to="/shop/?category=accessories&type=all"
        onClick={() =>
          registerRoutesHandler(
            "/shop/?category=accessories&type=all",
            "viewAll",
            "accessories"
          )
        }
      >
        <Accessories />
      </NavLink>
    </section>
  );
};

export default Categories;
