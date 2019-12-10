/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-12-05 11:22:59
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-10 15:06:57
 */
const fs = window.require('fs').promises

const fileHelper = {
  readFile: (path) => {
    return fs.readFile(path, { encoding: 'utf-8' })
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content, {encoding: 'utf-8'})
  },
  renameFile: (path, newPath) =>{
    return fs.rename(path, newPath)
  },
  deleteFile: (path) => {
    return fs.unlink(path)
  }
}

module.exports = fileHelper

