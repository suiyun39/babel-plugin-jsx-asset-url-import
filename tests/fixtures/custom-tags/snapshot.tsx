import _import_assets from "./logo.png";
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
      <Image src={_import_assets} />
      <Bar.Image src={_import_assets} />
      <Foo.Bar.Image src={_import_assets} />
    </article>
  );
};