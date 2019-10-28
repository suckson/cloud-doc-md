/*
 * @Author: suckson
 * @Date: 2019-09-19 13:55:35
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-16 17:08:56
 */
import React, { useState } from 'react'
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import FileSearch from './components/FileSearch'

import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import defaultFiles from './utils/defaultFiles'

import TabList from './components/TabList'

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const openedFiles = openedFileIDs.map(openID => {
    return files.find(file => file.id === openID)
  })
  const fileClick = (fileId) => {
    setActiveFileID(fileId)
    if(!openedFileIDs.includes(fileId)) {
        setOpenedFileIDs([...openedFileIDs, fileId])
    }
  }
  const tabClose = (id) =>{
    const tabWithout = openedFileIDs.filter(fileID => fileID !== id )
    setOpenedFileIDs(tabWithout)
    console.log(tabWithout)
    if(tabWithout.length > 0){
      setActiveFileID(tabWithout[0])
    }else{
      setActiveFileID('')
    }
  }
  const activeFile = files.find(file => file.id === activeFileID)
  const fileChange = (id, value) => {
    // loop througth file array to update a new value
    const newFile = files.map(file => {
        if(file.id === id){
          file.body = value
        }
        return file
    })
    setFiles(newFile)
    // update UnsaveIds
    if(!unsavedFileIDs.includes(id)){
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }
  const tabClick = (fileId) => {
    setActiveFileID(fileId)
  }
  return (
    <div className="App container-fluid px-0">
      <div className="row px-0 mx-0">
        <div className="col-3 bg-light left-panel px-0">
          <FileSearch onFileSearch = {(value) =>{ console.log(value) }} />
          <FileList files={ defaultFiles } 
           onFileClick={fileClick}
           onSaveEdit={(id, newVlaue) => {console.log(id + newVlaue)}}
           onFileDelete={(id) => {console.log('delting' + id)}}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} />
            </div>
            <div className="col">
              <BottomBtn text="导入" colorClass="btn-success" icon={faFileImport} />
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
  );
}

export default App;
