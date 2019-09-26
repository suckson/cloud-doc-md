/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-21 23:43:50
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-22 00:03:34
 */
import { useState, useEffect } from 'react'

const useKeyPress = (targetKeyCode) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const keyDownHandler = ({ keyCode }) => {
    if (keyCode === targetKeyCode) {
      setKeyPressed(true)
    }
  }
   const keyUpHandler = ({ keyCode }) => {
    if (keyCode === targetKeyCode) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return keyPressed
}
export default useKeyPress