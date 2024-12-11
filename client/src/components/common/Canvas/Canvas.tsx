import React from 'react'
import useCanvas from './useCanvas'

const Canvas = (props:any) => {  
  
  const { draw, ...rest } = props
  const ref = useCanvas(draw)
  
  return <canvas ref={ref} {...rest}/>
}

export default Canvas