const config = require('config');
const { remote, ipcRenderer } = require('electron')
var path = require("path")
const {PythonShell} = require("python-shell");


const PYTHON_EXE_PATH = config.get('PYTHON_EXE_PATH');
const PYTHON_SHELL_OPTIONS_Mode = config.get('PYTHON_SHELL_OPTIONS_Mode');
const PYTHON_SHELL_OPTIONS_Options = config.get('PYTHON_SHELL_OPTIONS_Options');
const PYTHON_SHELL_OPTIONS_PythonFilesPath = config.get('PYTHON_SHELL_OPTIONS_PythonFilesPath');




document.getElementById('login-minimize').addEventListener('click', () => {
    remote.getCurrentWindow().minimize()
})

document.getElementById('login-close').addEventListener('click', () => {
    ipcRenderer.send('closeApp')
    //remote.getCurrentWindow().close()
})

document.getElementById('loginBtn').addEventListener('click', () => {
    ipcRenderer.send('login-into-app')
    console.log('App JS sent to IPC Renderer')
})

// Function called from UI
function get_userName() {

    console.log('Inside get_userName() Function')
    var userName = document.getElementById("login_username").value
    console.log('Print in JS File - ' + userName);

    let options = {
        mode: PYTHON_SHELL_OPTIONS_Mode, 
        pythonPath: PYTHON_EXE_PATH,
        pythonOptions: [PYTHON_SHELL_OPTIONS_Options], // gets print results in real-time
        scriptPath: PYTHON_SHELL_OPTIONS_PythonFilesPath,
        args: [userName,'Ayush']
    };    
    
    // Calling python code here in login.py file
    PythonShell.run('login.py', options,  function  (err, message)  {
        if  (err)  throw err;

        // Recieving the output from python file
        console.log('Reply from Python recieved in js file as - ' + message)
    });
}

