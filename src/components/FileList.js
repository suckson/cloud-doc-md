/*
 * @Author: suckson
 * @Date: 2019-09-19 16:19:19
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-10 16:18:16
 */
import React , { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes  } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const { remote } =  window.require('electron')
const {Menu, MenuItem} = remote
const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState("")

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)
  
  const closeSearch = (editItem) => {
    setEditStatus(false)
    setValue('')
    if(editItem.isNew){
      onFileDelete(editItem.id)
    }
  }
  let node = useRef(null)
  useEffect(() => { 
    const menu = new Menu()
    menu.append(new MenuItem({
      label: '打开',
      click: () =>{
        console.log(123)
      }
    }))
    menu.append(new MenuItem({
      label: '重命名',
      click: () =>{
        console.log(123)
      }
    }))
    menu.append(new MenuItem({
      label: '删除',
      click: () =>{
        console.log(123)
      }
    }))
    menu.append(new MenuItem({
      label: '打开所在文件夹',
      click: () =>{
        console.log(123)
      }
    }))
    const handleContextMenu = (e) => {
      menu.popup({window: remote.getCurrentWindow()})
    }
    window.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  })
  useEffect(() => {
    const editItem = files.find(file => file.id === editStatus)
    if (enterPressed && editStatus && value.trim() !== "") {
      onSaveEdit(editItem.id,value, editItem.isNew)
      setEditStatus(false)
      setValue('')
    }
    if(escPressed && editStatus){
      closeSearch(editItem)
    }
  })
  useEffect(() => {
    const newFile = files.find(file => file.isNew)
    if(newFile){
      setEditStatus(newFile.id)
      setValue(newFile.title)
    }
  }, [files])
  useEffect(() => {
    if(editStatus){
      node.current.focus()
    }
  }, [editStatus])
  return (
    <ul className="list-group list-group-flush file-list">
      {
        files.map(file => (
          <li className = "list-group-item bg-light row d-flex align-item-center file-item mx-0" key={file.id}>
             { ((file.id !== editStatus) && !file.isNew) &&
            <>
             <span className="col-8 c-link"
              onClick = {() => {
                onFileClick(file.id)
              }}>
                  <FontAwesomeIcon title="编辑" icon={faMarkdown}/>
                {file.title}</span>
              <button
                type="button"
                className="icon-button px-0 col-2"
                onClick = {()=>{
                  setEditStatus(file.id)
                  setValue(file.title)
                }}
              >
              <FontAwesomeIcon
                title="编辑"
                icon={ faEdit }
                ></FontAwesomeIcon>
              </button>
              <button
                type="button"
                className="icon-button col-1 px-0"
                onClick = {() => { onFileDelete(file.id)}}>
              <FontAwesomeIcon
              title="删除"
              icon={ faTrash }
              ></FontAwesomeIcon>
              </button>
            </>
           }
           {
             ((file.id === editStatus) || file.isNew) &&
             <>
             <input
             className="form-control col-10 myinput-text"
             value={value}
             ref={ node }
             placeholder="请输入文件名称"
             onChange = {(e) => { 
              setValue(e.target.value) }}
             />
             <button type="button" className="icon-button col-2" onClick = {() => {closeSearch(file)}}>
                <FontAwesomeIcon icon={ faTimes } title="关闭"/>
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