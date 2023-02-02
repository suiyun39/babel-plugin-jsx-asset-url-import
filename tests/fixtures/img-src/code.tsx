import React from 'react'

export const App: React.FC = () => {
  return (
    <article>
      <img src="" alt="" />
      <img src="./logo.png" alt="" />
      <img src="http://example.com/fixtures/logo.png" alt="" />
      <img src="//example.com/fixtures/logo.png" alt="" />
      <img src="/fixtures/logo.png" alt="" />
      <img src="data:image/png;base64,i" alt="" />
    </article>
  )
}
