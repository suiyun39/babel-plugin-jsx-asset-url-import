import _import_assets2 from "./logo-2x.png";
import _import_assets from "./logo.png";
export function App() {
  return (
    <article>
      <img
        src={_import_assets}
        alt=""
        srcSet={`${_import_assets}, ${_import_assets} 2x, http://example.com/fixtures/logo.png 128w, data:image/png;base64,i 4x`}
      />
      <picture>
        <source media="(max-width: 800px)" srcSet={`${_import_assets}`} />
        <source media="(max-width: 1200px)" srcSet={`${_import_assets2}`} />
        <img src={_import_assets} alt="" />
      </picture>
    </article>
  );
}