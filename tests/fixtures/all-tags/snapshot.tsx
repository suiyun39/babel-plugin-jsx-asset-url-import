import _import_assets7 from "./track.vtt";
import _import_assets6 from "./video.webm";
import _import_assets5 from "./poster.png";
import _import_assets4 from "./video.mp4";
import _import_assets3 from "./help.pdf";
import _import_assets2 from "./logo.png";
import _import_assets from "./audio.mp3";
import React from "react";
export const App = () => {
  return (
    <article>
      <audio src={_import_assets} />
      <embed src={_import_assets2} type="image/png" />
      <img src={_import_assets2} alt="" />
      <input src={_import_assets2} type="image" alt="" />
      <object data={_import_assets3} type="application/pdf" />
      <video src={_import_assets4} poster={_import_assets5}>
        <source src={_import_assets6} type="video/webm" />
        <track src={_import_assets7} />
      </video>
      <image href={_import_assets2} xlinkHref={_import_assets2} />
      <use href={_import_assets2} xlinkHref={_import_assets2} />
    </article>
  );
};