/*
 * @Author: suckson
 * @Date: 2019-09-19 13:55:35
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-26 21:46:26
 */
import React from 'react'
import {faPlus, faFileImport} from '@fortawesome/free-solid-svg-icons'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'

import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import defaultFiles from './utils/defaultFiles'

import TabList from './components/TabList'

function App() {
  return (
    <div className="App container-fluid px-0">
      <div className="row">
        <div className="col-3 bg-light left-panel">
          <FileSearch
           onFileSearch = {(value) =>{
             console.log(value)
           }}
          />
          <FileList files={ defaultFiles } 
           onFileClick={(id) => {console.log(id)}}
           onSaveEdit={(id, newVlaue) => {console.log(id + newVlaue)}}
           onFileDelete={(id) => {console.log('delting' + id)}}
          />
          <div className="row">
            <div className="col">
              <BottomBtn text="新建" colorClass="btn-primary" icon={faPlus} />
            </div>
            <div className="col">
              <BottomBtn text="导入" colorClass="btn-success" icon={faFileImport} />
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
         <TabList 
           files={defaultFiles} 
           onTabClick={(id) => { console.log(id) }}
           activedId='1'
           /> 
        </div>
      </div>
    </div>
  );
}

export default App;
