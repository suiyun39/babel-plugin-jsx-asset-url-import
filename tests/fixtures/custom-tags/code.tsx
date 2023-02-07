import React from 'react'

const Image: React.FC<{ src: string }> = () => null
const Bar = { Image }
const Foo = { Bar }

export const App: React.FC = () => {
  return (
    <article>
      <img src="./logo.png" alt="" />
      <Image src="./logo.png" />
      <Bar.Image src="./logo.png" />
      <Foo.Bar.Image src="./logo.png" />
    </article>
  )
}
