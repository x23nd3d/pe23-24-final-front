import React from "react";
import { NavLink } from "react-router-dom";
import hereIsJohnny from "./heres404.png";
import {backBt, container, content} from "./err404.module.scss";

const Error404 = () => (
  <section data-testid="Error404TestId" className={container}>
    <article className={content}>
      <header>
        <img src={hereIsJohnny} alt="Here's Johnny!" />
        <h1>Not found page</h1>
      </header>
      <div>
        <p>
          The path you tried to pass does not exist. You may click below to back to the home page.
        </p>
      </div>
      <NavLink className={backBt} exact to="/" type="button">Back</NavLink>
    </article>
  </section>
);

export default Error404;