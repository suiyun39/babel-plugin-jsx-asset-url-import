import _track_src from "./track.vtt";
import _source_src from "./video.webm";
import _video_poster from "./poster.png";
import _video_src from "./video.mp4";
import _object_data from "./help.pdf";
import _embed_src from "./logo.png";
import _audio_src from "./audio.mp3";
import React from "react";
export const App = () => {
  return (
    <article>
      <audio src={_audio_src} />
      <embed src={_embed_src} type="image/png" />
      <img src={_embed_src} alt="" />
      <input src={_embed_src} type="image" alt="" />
      <object data={_object_data} type="application/pdf" />
      <video src={_video_src} poster={_video_poster}>
        <source src={_source_src} type="video/webm" />
        <track src={_track_src} />
      </video>
      <image href={_embed_src} xlinkHref={_embed_src} />
      <use href={_embed_src} xlinkHref={_embed_src} />
    </article>
  );
};