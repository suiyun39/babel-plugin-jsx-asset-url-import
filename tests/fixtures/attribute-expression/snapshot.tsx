/* eslint-disable @stylistic/jsx-curly-brace-presence */

export function App() {
  const src = "./logo.png";
  return (
    <article>
      <img src={src} alt="" />
      <img src={"./logo.png"} alt="" />
    </article>
  );
}