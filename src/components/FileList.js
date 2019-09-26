/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-19 16:19:19
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-26 21:34:15
 */
import React , { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes  } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState(null)
  const closeSearch = (e) =>{
    e.preventDefault()
    setEditStatus(false)
    setValue('')
  }
  useEffect(() => {
    const handleInputEvent = (event) => {
       const { keyCode } = event
       if (keyCode === 13 && editStatus) {
         const editItem = files.find(file => file.id === editStatus)
         onSaveEdit(editItem.id,value)
         setEditStatus(false)
         setValue('')
        }else if(keyCode === 27 && editStatus){
          closeSearch(event)
        }
    }
    document.addEventListener('keyup',handleInputEvent)
    return () => {
      document.removeEventListener('keyup',handleInputEvent)
    }
  })
  return (
    <ul className="list-group list-group-flush file-list">
      {
        files.map(file => (
          <li className = "list-group-item bg-light row d-flex align-item-center file-item mx-0" key="file.id">
             { (file.id !== editStatus) && 
            <>
              <span className="col-2">
              <FontAwesomeIcon size="lg" title="编辑" icon={faMarkdown}/>
              </span>
              <span className="col-8 c-link"
              onClick = {() => {
                onFileClick(file.id)
              }}
              >{file.title}</span>
              <button
              type="button"
              className="icon-button col-1"
              onClick = {()=>{
                setEditStatus(file.id)
                setValue(file.title)
              }}
              >
                <FontAwesomeIcon
                title="编辑"
                size="lg"
                icon={ faEdit }
                ></FontAwesomeIcon>
              </button>
              <button
              type="button"
              className="icon-button col-1"
              onClick = {()=>{
                alert('我是删除的方法')
              }}
              >
                <FontAwesomeIcon
                title="删除"
                size="lg"
                icon={ faTrash }
                ></FontAwesomeIcon>
              </button>
            </>
           }
           {
             (file.id === editStatus) &&
             <>
             <input
             className="form-control col-10"
             value={value}
             onChange = {(e) => {}}
             />
             <button type="button" 
                className="icon-button col-2"
                onClick =  { closeSearch }
                >
                <FontAwesomeIcon icon={ faTimes } title="关闭"  size="lg" />
              </button>
             </>
           }
          </li>
         
        ))
      }
    </ul>
  )
}
FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func
}
export default FileList