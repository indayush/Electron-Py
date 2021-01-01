const config = require('config');

const electron = require('electron')
const app = electron.app
const path = require('path')
const { ipcMain } = require('electron')

const BrowserWindow = electron.BrowserWindow

const windowWidth = config.get('ELECTRON_WINDOW_WIDTH');
const windowHeight = config.get('ELECTRON_WINDOW_HEIGHT');
const NODE_Enable_DEV_Mode_In_All_Window = config.get('NODE_Enable_DEV_Mode_In_All_Window');
const Node_Logging_Enabled = config.get('NODE_Logging_Enabled');
const ELECTRON_ENABLE_WINDOW_FRAME = config.get('ELECTRON_ENABLE_WINDOW_FRAME');


app.on('ready', function () {
    let loginWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        titleBarStyle: "hidden",
        show: false,
        frame:ELECTRON_ENABLE_WINDOW_FRAME
        // Frame is used top toggle outer menu bar for app
    })

    //loginWindow.maximize()

    if (NODE_Enable_DEV_Mode_In_All_Window) {
        loginWindow.webContents.openDevTools()
    }
    loginWindow.loadURL('file://' + __dirname + '/html/login.html')
    //console.log('file://' + __dirname + '/html/login.html')
    loginWindow.once('ready-to-show', function () {
        loginWindow.show()
    })

    // Starting Second Window here -

    let dashboard_Home = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        titleBarStyle: "hidden",
        show: false,
        frame:ELECTRON_ENABLE_WINDOW_FRAME
    })

    //dashboard_Home.maximize()
    if (NODE_Enable_DEV_Mode_In_All_Window) {
        dashboard_Home.webContents.openDevTools()
    }

    dashboard_Home.loadURL('file://' + __dirname + '/html/dashboard_Homepage.html')
    //console.log('file://' + __dirname + '/html/dashboard_Homepage.html')
    dashboard_Home.once('ready-to-show', function () {
        dashboard_Home.hide()
    })





    // IPC Communications

    ipcMain.on('login-into-app', function () {
        if (Node_Logging_Enabled) {
            console.log('Command Recieved in Node JS - ' + 'login-into-app')
        }
        loginWindow.hide()
        dashboard_Home.show()
    })

    ipcMain.on('closeApp', function () {
        if (Node_Logging_Enabled) {
            console.log('Command Recieved in Node JS - ' + 'closeApp')
        }
        app.quit()
    })

    ipcMain.on('logoutFromApp', function () {
        if (Node_Logging_Enabled) {
            console.log('Command Recieved in Node JS - ' + 'logoutFromApp')
        }
        loginWindow.show()
        dashboard_Home.hide()
    })
    

    loginWindow.on('move', function () {
        if (Node_Logging_Enabled) {
            console.log('moveWindow function invoked')
        }
        let position = loginWindow.getPosition()
        dashboard_Home.setPosition(position[0], position[1.0], true)

    })

})



app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})