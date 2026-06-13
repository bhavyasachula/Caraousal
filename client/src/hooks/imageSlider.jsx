import { useEffect, useRef, useState } from 'react'



export function useSlider(images) {
  const [index, setIndex] = useState(0)
  const [fadeKey, setFadeKey] = useState(0)
  const intervalRef = useRef(null)

  const advance = () => {
    setIndex(prev => (prev + 1) % images.length)
    setFadeKey(k => k + 1)
  }

  // auto-play
  useEffect(() => {
    if (images.length === 0) return
    intervalRef.current = setInterval(
    advance,
    2500)
    return () => clearInterval(intervalRef.current)
  }, [images.length])

  const nextImg = () => {
    setIndex(prev => (prev + 1) % images.length)
    setFadeKey(k => k + 1)
  }

  const prevImg = () => {
    setIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
    setFadeKey(k => k + 1)
  }

  const goTo = (i) => {
    setIndex(i)
    setFadeKey(k => k + 1)
  }

  const stopSlider = () => clearInterval(intervalRef.current)

  const startSlider = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(advance, 2500)
  }

  return { index, fadeKey, nextImg, prevImg, goTo, stopSlider, startSlider }
}