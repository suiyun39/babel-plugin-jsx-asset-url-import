import _import_assets from "./logo.png";
export function App() {
  return (
    <article>
      <img src="" alt="" />
      <img src={_import_assets} alt="" />
      <img src="http://example.com/fixtures/logo.png" alt="" />
      <img src="//example.com/fixtures/logo.png" alt="" />
      <img src="/fixtures/logo.png" alt="" />
      <img src="data:image/png;base64,i" alt="" />
    </article>
  );
}