import { useRef, useEffect } from 'react'

const useCanvas = (draw:(ctx:CanvasRenderingContext2D, count:number)=>void) => {
  
  const ref = useRef(null)
  
  useEffect(() => {
    
    const canvas = ref.current as unknown as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    let count = 0
    let animationId:any
    
    const renderer = () => {
      count++
      draw(context, count)
      animationId = window.requestAnimationFrame(renderer)
    }
    renderer()
    
    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [draw])
  
  return ref
}

export default useCanvas