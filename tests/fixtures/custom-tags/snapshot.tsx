import _ImagePreview_src from "./logo.png";
import React from "react";
export const ImagePreview = (props) => {
  const { src, width, height } = props;
  return <img src={src} width={width} height={height} alt="" />;
};
export const App = () => {
  return (
    <article>
      <img src="./logo.png" alt="" />
      <ImagePreview src={_ImagePreview_src} width={100} height={100} />
    </article>
  );
};