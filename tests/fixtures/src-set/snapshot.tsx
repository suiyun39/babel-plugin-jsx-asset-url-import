import _import_assets from "./logo-2x.png";
import _img_src from "./logo.png";
import React from "react";
export const App = () => {
  return (
    <article>
      <img
        src={_img_src}
        alt=""
        srcSet={`${_img_src}, ${_img_src} 2x, http://example.com/fixtures/logo.png 128w, data:image/png;base64,i 4x`}
      />
      <picture>
        <source media="(max-width: 800px)" srcSet={`${_img_src}`} />
        <source media="(max-width: 1200px)" srcSet={`${_import_assets}`} />
        <img src={_img_src} alt="" />
      </picture>
    </article>
  );
};