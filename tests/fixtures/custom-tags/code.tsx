import React from 'react'

export type ImagePreviewProps = {
  src: string
  width?: number
  height?: number
}

export const ImagePreview: React.FC<ImagePreviewProps> = props => {
  const { src, width, height } = props
  return <img src={src} width={width} height={height} alt="" />
}

export const App: React.FC = () => {
  return (
    <article>
      <img src="./logo.png" alt="" />
      <ImagePreview src="./logo.png" width={100} height={100} />
    </article>
  )
}
