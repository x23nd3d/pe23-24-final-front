import React from "react";
import hereIsJohnny from "./heres404.png";
import {backBt, container, content} from "./err404.module.scss";

const Error404 = () => (
  <section className={container}>
    <article className={content}>
      <header>
        <img src={hereIsJohnny} alt="Here's Johnny!" />
        <h1>Not found page</h1>
      </header>
      <div>
        <p>
          The path you tried to pass does not exist. You may click below to back the home page.
        </p>
      </div>
    <button className={backBt} type="button">Back</button>
    </article>
  </section>
);

export default Error404;