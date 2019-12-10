/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-19 16:19:19
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-03 18:03:30
 */
import React , { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileSearch = ({title, onFileSearch}) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)
  let node = useRef(null)

  const startSearch = () => {
    setInputActive(true)
  }
  const closeSearch = () =>{
    setInputActive(false)
    setValue('')
    onFileSearch(false)
  }
  useEffect(() => {
    if(enterPressed && inputActive){
      onFileSearch(value)
    }
    if(escPressed && inputActive){
      closeSearch()
    }
  })
  useEffect(() => {
    if(inputActive){
      node.current.focus()
    }
  }, [inputActive])
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
      {!inputActive && <>
        <span>{ title }</span>
        <button type="button" 
        className="icon-button"
        onClick = {startSearch}
        >
        <FontAwesomeIcon icon={ faSearch } title="搜索"  size="lg" />
        </button>
      </>}
      { inputActive && 
       <>
         <input
         className="from-control"
         value = { value }
         ref = {node}
         onChange = {(e) => {
         // console.log(e.target.value)
          onFileSearch(e.target.value)
          setValue(e.target.value)
         }}
         />
         <button type="button" 
          className="icon-button"
          onClick = {() => { setInputActive(false) }}
          >
          <FontAwesomeIcon icon={ faTimes } title="关闭"  size="lg" />
        </button>
       </> 
      }
    </div>
  )
}
FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch : PropTypes.func.isRequired
}
FileSearch.defaultProps  = {
  title: '我的云文档'
}
export default FileSearch