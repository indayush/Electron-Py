const electron = require('electron')
const app = electron.app
const path = require('path')
const { ipcMain } = require('electron')

const BrowserWindow = electron.BrowserWindow

var enableDevModeInAllWindow = true
var loggingEnabled = true


app.on('ready', function () {
    let loginWindow = new BrowserWindow({
        width: 1360,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        titleBarStyle: "hidden",
        show: false,

        //frame:false
    })


    //loginWindow.maximize()

    if (enableDevModeInAllWindow) {
        loginWindow.webContents.openDevTools()
    }
    loginWindow.loadURL('file://' + __dirname + '/html/login.html')
    //console.log('file://' + __dirname + '/html/login.html')
    loginWindow.once('ready-to-show', function () {
        loginWindow.show()
    })

    // Starting Second Window here -

    let dashboard_Home = new BrowserWindow({
        width: 1360,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        titleBarStyle: "hidden",
        show: false

        //frame:false
    })

    //dashboard_Home.maximize()
    if (enableDevModeInAllWindow) {
        dashboard_Home.webContents.openDevTools()
    }
    dashboard_Home.loadURL('file://' + __dirname + '/html/dashboard_Homepage.html')
    //console.log('file://' + __dirname + '/html/dashboard_Homepage.html')
    dashboard_Home.once('ready-to-show', function () {
        dashboard_Home.hide()
    })

    ipcMain.on('login-into-app', function () {
        if (loggingEnabled) {
            console.log('Command Recieved in Node JS - ' + 'login-into-app')
        }
        loginWindow.hide()
        dashboard_Home.show()
    })

    ipcMain.on('closeApp', function () {
        if (loggingEnabled) {
            console.log('Command Recieved in Node JS - ' + 'closeApp')
        }
        app.quit()
    })

    ipcMain.on('logoutFromApp', function () {
        if (loggingEnabled) {
            console.log('Command Recieved in Node JS - ' + 'logoutFromApp')
        }
        loginWindow.show()
        dashboard_Home.hide()
    })
    

    loginWindow.on('move', function () {
        if (loggingEnabled) {
            console.log('moveWindow function invoked')
        }
        let position = loginWindow.getPosition()
        dashboard_Home.setPosition(position[0], position[1.0], true)

    })

})



app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})