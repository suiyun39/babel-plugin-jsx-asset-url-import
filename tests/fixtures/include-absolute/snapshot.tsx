import _img_src2 from "/fixtures/logo.png";
import _img_src from "./logo.png";
import React from "react";
export const App = () => {
  return (
    <article>
      <img src={_img_src} alt="" />
      <img src={_img_src2} alt="" />
      <img src="//example.com/fixtures/logo.png" alt="" />
    </article>
  );
};