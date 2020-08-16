const electron = require('electron')
const app = electron.app
const path = require('path')


const BrowserWindow = electron.BrowserWindow

app.on('ready', function () {
    let loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntefration: true
        },
        titleBarStyle: "hidden",
        show: false,

        //frame:false
    })


    loginWindow.loadURL('file://' + __dirname + '/html/login.html')
    console.log('file://' + __dirname + '/html/login.html')
    loginWindow.once('ready-to-show', function () {
        loginWindow.show()
    })

    // Starting Second Window here -
    
    let dashboard_Home = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntefration: true
        },
        titleBarStyle: "hidden",
        show: false,

        //frame:false
    })


    dashboard_Home.loadURL('file://' + __dirname + '/html/dashboard_Homepage.html')
    console.log('file://' + __dirname + '/html/dashboard_Homepage.html')
    dashboard_Home.once('ready-to-show', function () {
        dashboard_Home.show()
    })



})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})