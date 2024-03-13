export function App() {
  return (
    <article>
      <img
        src="./logo.png"
        alt=""
        srcSet="./logo.png, ./logo.png 2x, http://example.com/fixtures/logo.png 128w, data:image/png;base64,i 4x"
      />
      <picture>
        <source media="(max-width: 800px)" srcSet="./logo.png" />
        <source media="(max-width: 1200px)" srcSet="./logo-2x.png" />
        <img src="./logo.png" alt="" />
      </picture>
    </article>
  )
}
