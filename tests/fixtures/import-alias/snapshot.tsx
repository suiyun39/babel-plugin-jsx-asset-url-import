import _import_assets4 from "@/fixtures/logo.png";
import _import_assets3 from "@fixtures/logo.png";
import _import_assets2 from "~/fixtures/logo.png";
import _import_assets from "~fixtures/logo.png";
import React from "react";
export const App = () => {
  return (
    <article>
      <img src={_import_assets} alt="" />
      <img src={_import_assets2} alt="" />
      <img src={_import_assets3} alt="" />
      <img src={_import_assets4} alt="" />
    </article>
  );
};