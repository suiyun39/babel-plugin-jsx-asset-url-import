interface ImageProps {
  src: string
}

function Image(props: ImageProps) {
  return <img src={props.src} alt="" />
}

const Bar = { Image }
const Foo = { Bar }

export function App() {
  return (
    <article>
      <img src="./logo.png" alt="" />
      <Image src="./logo.png" />
      <Bar.Image src="./logo.png" />
      <Foo.Bar.Image src="./logo.png" />
    </article>
  )
}
