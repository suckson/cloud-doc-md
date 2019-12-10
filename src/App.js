/* eslint-disable no-unused-expressions */
/*
 * @Author: suckson
 * @Date: 2019-09-19 13:55:35
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-10 14:59:27
 */
import React, { useState } from 'react'
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons'
import uuidv4 from 'uuid/v4'
import {flattenArr, objToArr} from './utils/helper'
import fileHelper from './utils/fileHelper'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'

const { join, basename, extname, dirname } = window.require('path')
const { remote } =  window.require('electron')
const  Store  =  window.require('electron-store')
const fileStore = new Store({'name': "Files Data"})

const saveFilesToStore = (files) => {
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const {id, path, title, createdAt} = file
    result[id] = {
      id,
      path,
      title,
      createdAt
    }
    return result
  },{})
  fileStore.set('files', filesStoreObj)
}

function App() {
  const [files, setFiles] = useState(fileStore.get('files') || {})
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const filesArr = objToArr(files)
  const [searchedFiles, setSearchedFiles] = useState([])
  const savedLocation = remote.app.getPath('downloads')

  const activeFile = files[activeFileID]
  
  const fileClick = (fileID) => {
    // console.log(files[fileID])
    setActiveFileID(fileID)
    const curentFile = files[fileID]
    if(!curentFile.isLoaded){
      fileHelper.readFile(curentFile.path).then(value => {
        const newFile = { ...files[fileID], body:value, isLoaded: true}
        setFiles({...files, newFile})
      })
    }
    if(!openedFileIDs.includes(fileID)) {
        setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }


  
  const tabClose = (id) => {
    const tabWithout = openedFileIDs.filter(fileID => fileID !== id )
    setOpenedFileIDs(tabWithout)
    if(tabWithout.length > 0){
      setActiveFileID(tabWithout[0])
    }else{
      setActiveFileID('')
    }       
  }
  const creatNewFile = () => {
      const newID = uuidv4()
      const newFiles = 
      {
        id: newID,
        title: '',
        body: '######请输入',
        createdAt: new Date().getTime(),
        isNew: true
      }
      setFiles({...files,[newID]: newFiles})
  }
  
  const saveCurrentFile = () => {
    fileHelper.writeFile(join(savedLocation, `${activeFile.title}.md`), activeFile.body)
    .then(() => {
      setUnsavedFileIDs(unsavedFileIDs.filter(id => id !== activeFile.id))
    })
  }

  const deleteFile = (id) => {
    if (files[id].isNew) {
      const { [id]: value, ...afterDelete } = files
      setFiles(afterDelete)
    } else {
      fileHelper.deleteFile(files[id].path).then(() => {
        const { [id]: value, ...afterDelete } = files
        setFiles(afterDelete)
        saveFilesToStore(files)
        // close the tab if opened
        tabClose(id)
      })
    }
  }    

  const fileChange = (id, value) => {
    const newFile = { ...files[id], body: value}
    setFiles({...files, [id]: newFile })
    // update UnsaveIds
    if(!unsavedFileIDs.includes(id)){
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }
  const importFiles = () => {
    remote.dialog.showOpenDialog({
      title: '选择导入的MarkDown 文件',
      properties:['openFile', 'multiSelections'],
      filters: [
        {name: 'Markdown file', extensions:['md']}
      ]
    },(paths) => {
      console.log(paths)
      if(Array.isArray(paths)){
        const filteredPaths = paths.filter(path => {
          const alerdyAdded = Object.values(files).find(file => {
            return file.path === path
          })
          return !alerdyAdded
        })
        console.log(filteredPaths)
        const importFilesArr = filteredPaths.map(path => {
          return {
            id: uuidv4(),
            path,
            title: basename(path, extname(path))
          }
        })
        console.log(importFilesArr)
        const newFiles = {...files, ...flattenArr(importFilesArr)}
        setFiles(newFiles)
        saveFilesToStore(newFiles)
        if(importFiles.length > 0){
          remote.dialog.showMessageBox({
            title: `成功导入了${importFiles.length}个文件`,
            type: 'info',
            message:`成功导入了${importFiles.length}个文件`
          })
        }
      }
    })
  }
  const updateFileName = (id, title, isNew) => {
    const newPath =isNew ? join(savedLocation, `${title}.md`) : join(dirname(files[id].path), `${title}.md`)
    const modifiedFile = { ...files[id], title, isNew: false, path: newPath }
    const newFiles = {...files, [id]: modifiedFile }
    if(isNew){
      fileHelper.writeFile(newPath, files[id].body).then(() =>{
        setFiles({...files, [id]: modifiedFile})
        saveFilesToStore(newFiles)
      })
    }else{
      const oldPath = files[id].path
      fileHelper.renameFile(oldPath, newPath).then(() => {
        setFiles({...files, [id]: modifiedFile})
        saveFilesToStore(newFiles)
      })
    }
  }
  const tabClick = (fileId) => {
    setActiveFileID(fileId)
  }

  
  const fileSearch = (keyword) => {
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    console.log(newFiles)
    setSearchedFiles(newFiles)
    console.log(keyword)
  }
  
  const openedFiles = openedFileIDs.map(openID => {
    return files[openID]
  })
  const FileListArr = (searchedFiles.length > 0) ? searchedFiles : filesArr

  return (
    <div className="App container-fluid px-0">
      <div className="row px-0 mx-0">
        <div className="col-3 bg-light left-panel px-0">
          <FileSearch onFileSearch = { fileSearch} />
          <FileList files={ FileListArr } onFileClick={fileClick} onSaveEdit={updateFileName} onFileDelete={deleteFile} onupdateFileName={updateFileName} />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn text="新建" colorClass="btn-primary" onBtnClick={creatNewFile} icon={faPlus} />
            </div>
            <div className="col">
              <BottomBtn text="导入" colorClass="btn-success" onBtnClick={importFiles} icon={faFileImport} />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
        {!activeFile &&
        <div className="page-start">
          选择或者创建新的markDown 文档
        </div>
        }
        { activeFile && 
        <>
          <TabList 
            files={openedFiles} 
            onTabClick={tabClick}
            activedId={activeFileID}
            unsaveIds={unsavedFileIDs}
            onCloseTab={tabClose}
            />
            <SimpleMDE 
              key = {activeFile && activeFile.id}
              value={activeFile && activeFile.body} 
              onChange={(value) => {fileChange(activeFile.id, value)}}
              />
          </>
        }
        </div>
      </div>
    </div>
  )
}
export default App;
