import React from "react";
import { NavLink } from "react-router-dom";
import {backBt, container, content} from "./ErrorFallback.module.scss";

const ErrorFallback = () => (
  <section data-testid="Error404TestId" className={container}>
    <article className={content}>
      <header>
        <h1>Somthing went wrong</h1>
      </header>
      {/* <div>
        <p>
          The path you tried to pass does not exist. You may click below to back to the home page.
        </p>
      </div> */}
      <NavLink className={backBt} exact to="/" type="button">Back To Home Page</NavLink>
    </article>
  </section>
);

export default ErrorFallback;