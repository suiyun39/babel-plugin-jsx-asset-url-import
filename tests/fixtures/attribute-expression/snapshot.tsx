/* eslint-disable @stylistic/jsx-curly-brace-presence */
import React from "react";
export const App = () => {
  const src = "./logo.png";
  return (
    <article>
      <img src={src} alt="" />
      <img src={"./logo.png"} alt="" />
    </article>
  );
};