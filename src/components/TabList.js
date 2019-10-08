/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-26 20:55:25
 * @LastEditors: suckson
 * @LastEditTime: 2019-10-07 21:17:53
 */
import React from 'react'

import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import classNames from 'classnames'

import './TabList.scss'

const TabList = ({files, activedId, unsaveIds, onTabClick, onCloseTab}) =>{
  return(
    <ul className="nav nav-pills tablist-component">
      {files.map(file => {
        const widthUnsavedMark = unsaveIds.includes(file.id)
        const fClassNames = classNames({
          'nav-link': true,
          'active': file.id === activedId,
          'withUnsaved': widthUnsavedMark
        })
        return (
          <li className="nav-item" key={file.id}>
            <a
              href="#"
              className= {fClassNames}
              onClick={(e) => {e.stopPropagation(); onTabClick(file.id)}}
            >
               {file.title}
               <span className="ml-2 close-icon" onClick="{(e) => {
                 e.preventDefault()
                 onCloseTab(file.id)
               }}">
                <FontAwesomeIcon size="lg" title="编辑" icon={faTimes}/>
               </span>
               {
                 widthUnsavedMark && <span className="rounded-circle unsaved-icon ml-2"></span>
               }
             </a>
          </li>
        )
      })}
    </ul>
  )
}
TabList.propTypes = {
  files: PropTypes.array,
  activedId: PropTypes.string,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
}
export default TabList