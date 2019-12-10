/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-26 20:55:25
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-06 13:36:34
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
        const withUnsavedMark = unsaveIds.includes(file.id)
        const fClassName = classNames({
          'nav-link': true,
          'active': file.id === activedId,
          'withUnsaved': withUnsavedMark
        })
        return (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <li className="nav-item" key={file.id}>
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a href="#" className={fClassName} onClick={(e) => {e.preventDefault(); onTabClick(file.id)}}>
              {file.title}
              <span 
                className="ml-2 close-icon"
                onClick={(e) => {e.stopPropagation(); onCloseTab(file.id)}}
              >
                <FontAwesomeIcon
                  icon={faTimes} 
                />
              </span>
              { withUnsavedMark && <span className="rounded-circle ml-2 unsaved-icon"></span>}
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