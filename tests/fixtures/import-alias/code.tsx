import React from 'react'

export const App: React.FC = () => {
  return (
    <article>
      <img src="~fixtures/logo.png" alt="" />
      <img src="~/fixtures/logo.png" alt="" />
      <img src="@fixtures/logo.png" alt="" />
      <img src="@/fixtures/logo.png" alt="" />
    </article>
  )
}
