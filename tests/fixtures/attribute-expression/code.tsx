import React from 'react'

export const App: React.FC = () => {
  const src = './logo.png'

  return (
    <article>
      <img src={src} alt="" />
      <img src={'./logo.png'} alt="" />
    </article>
  )
}
