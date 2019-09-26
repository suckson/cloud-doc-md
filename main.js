/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-09-19 14:34:14
 * @LastEditors: suckson
 * @LastEditTime: 2019-09-20 23:58:15
 */
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
let mainWindow

app.on('ready', ()=>{
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow.loadURL(urlLocation)
})