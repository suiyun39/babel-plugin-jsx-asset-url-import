import _import_assets from "./logo.png";
function Image(props) {
  return <img src={props.src} alt="" />;
}
const Bar = {
  Image,
};
const Foo = {
  Bar,
};
export function App() {
  return (
    <article>
      <img src="./logo.png" alt="" />
      <Image src={_import_assets} />
      <Bar.Image src={_import_assets} />
      <Foo.Bar.Image src={_import_assets} />
    </article>
  );
}