import React from 'react'

export const App: React.FC = () => {
  return (
    <article>
      <audio src="./audio.mp3" />
      <embed src="./logo.png" type="image/png" />
      <img src="./logo.png" alt="" />
      <input src="./logo.png" type="image" alt="" />
      <object data="./help.pdf" type="application/pdf" />
      <video src="./video.mp4" poster="./poster.png">
        <source src="./video.webm" type="video/webm" />
        <track src="./track.vtt" />
      </video>
      <image href="./logo.png" xlinkHref="./logo.png" />
      <use href="./logo.png" xlinkHref="./logo.png" />
    </article>
  )
}
