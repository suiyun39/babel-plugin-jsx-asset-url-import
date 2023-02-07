import _Image_src from "./logo.png";
import React from "react";
const Image = () => null;
const Bar = {
  Image,
};
const Foo = {
  Bar,
};
export const App = () => {
  return (
    <article>
      <img src="./logo.png" alt="" />
      <Image src={_Image_src} />
      <Bar.Image src={_Image_src} />
      <Foo.Bar.Image src={_Image_src} />
    </article>
  );
};